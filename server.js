var bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express')
const next = require('next');
const routes = require('./routes');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);
const queries = require('./db/queries');
const jwt = require('jsonwebtoken');
const verifyVoter = require('./middlewares/verifyToken')
const verifyAdmin = require('./middlewares/verifyAdmin')
const verifyFactory = require('./middlewares/verifyFactory')

const NodeRSA = require('node-rsa');
let multer = require('multer');
let upload = multer();
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const { convertCSVToArray } = require('convert-csv-to-array');
var ldap = require('ldapjs');
require('dotenv').config()

app.prepare().then(() => {

  const httpApp = express();
  httpApp.use( bodyParser.json() );
  httpApp.use(cors())

  httpApp.post('/authenticateAdmin', verifyAdmin, async(req,res) => {
    return res.status(200).send('overeny');
  });

  httpApp.post('/authenticateFactory', verifyFactory, async(req,res) => {
    return res.status(200).send('overeny');
  });

  httpApp.post('/login', async(req, res) => {
    try{ 
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        var client = ldap.createClient({
        url: 'ldaps://chancer.mendelu.cz:636',
        reconnect: true
      });

      let isAuthenticated = await client.bind("uid=" +req.body.username+ ", ou=People, dc=mendelu, dc=cz", req.body.password, (err, res2) => {
        if (err) {
          client.unbind();
          res.send({response: 'notAuth'})
        } else{
          client.unbind();
          res.send({response: 'Auth'})
          }
        }
      ); 

      client.unbind();
    } catch (error) {
      console.log('Err authenticate', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.post('/authenticate', async(req, res) => {
   try{

      var token = ''
      const type = await queries.getUserAuth(
        {
          id_voter: req.body.username,
          type: req.body.type
        });


        if(type !== undefined){
          if(req.body.type == 1 && type.length > 0){
            token = jwt.sign({_id:req.body.username, type:1}, 'isAdmin')
          } else if (req.body.type == 2 && type.length > 0){
            token = jwt.sign({_id:req.body.username, type:2}, 'isFactory')
          } else if(req.body.type == 0 && type.length > 0){
            token = jwt.sign({_id:req.body.username, type:0}, 'isVoter', { expiresIn: 5 })
          }
      }
      res.header('auth-token', token).send(token);
      
    } catch (error) {
      console.log('Err authenticate', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/getUserAuth', async(req, res) => {
    try {
      const response = await queries.getUserAuth(
        {
          id_voter: req.query.username,
          type: req.query.type
        });

      return res.send(response)
    } catch (error) {
      console.log('Error getUserAuth', error);
      return res.sendStatus(500);
    }
  })

  httpApp.post('/upload', upload.any(), async(req, res) => {
    let files = req.files;
    
    try{
      let csv = files[0]['buffer'].toString('ASCII')
      const array = convertCSVToArray(csv, {header:true, type:"object", separator:";"});
      await Promise.all(array[0].map(async (voter) => {
        var admin = '0'
        if(voter.includes(':admin')){
          admin = '1'
          voter = voter.replace(':admin', '')
        } else if(voter.includes(':factory')){
          admin = '2'
          voter = voter.replace(':factory', '')
        }
        
        await queries.newVoter(
          {
            address_election:req.query.address,
            voter_id: voter,
            isAdmin:admin
          })
      }))
      return res.send(200)
    }catch (error) {
      console.log('Error upload voters', error);
      return res.sendStatus(500);
    }
  })

  httpApp.post('/uploadLDAP', upload.any(), async(req, res) => {
    let files = req.files;
    let csv = files[0]['buffer'].toString('ASCII')
    const array = convertCSVToArray(csv, {header:true, type:"object", separator:";"});
    try{
      await Promise.all(array[0].map(async (voter) => {
          await queries.newVoterLDAP(
          {
            address_election:req.query.address,
            voter_id: voter
          })
      }))
      return res.send(200)
    }catch (error) {
      console.log('Error upload voters', error);
      return res.sendStatus(500);
    }
  })

  httpApp.put('/saveRSAPublicKey', verifyFactory, async(req, res) => {
    try {
      const response = await queries.addRSAPubKey(
        {
          address: req.body.address,
          RSAPubKey: req.body.RSAPubKey,
        });
      return res.send(response)
    } catch (error) {
      console.log('Error addRSAPubKey', error);
      return res.sendStatus(500);
    }
  })

  httpApp.put('/setElectionNotVisible', verifyFactory, async(req, res) => {
    try {
      const response = await queries.setElectionNotVisible(
        {
          address: req.body.address,
        });
      return res.send(response)
    } catch (error) {
      console.log('Error setElectionNotVisible', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.put('/setElectionAsCreatedWithKeys', verifyFactory, async(req, res) => {
    try {
        let response

        var isProposal = req.body.proposal

        if(isProposal == 1){
          response = await queries.setProposalAsCreatedWithKeys(
            {
              address: req.body.address,
            });
        } else {
          response = await queries.setElectionAsCreatedWithKeys(
          {
            address: req.body.address,
          });
        }

      return res.send(response)
    } catch (error) {
      console.log('Error setElectionAsCreatedWithKeys', error);
      return res.sendStatus(500);
    }
  })

  httpApp.put('/hideElection', async(req, res) => {
    try {
      const response = await queries.hideElection(
        {
          address: req.body.address,
        });

      return res.send(response)
    } catch (error) {
      console.log('Error hideElection', error);
      return res.sendStatus(500);
    }
  })

  
  
  httpApp.put('/setElectionAsFinished', verifyAdmin, async(req, res) => {
    try {
      const response = await queries.setElectionAsFinished(
        {
          address: req.body.address,
        });
      return res.send(response)
    } catch (error) {
      console.log('Error setElectionAsFinished', error);
      return res.sendStatus(500);
    }
  })

  httpApp.put('/setProposalAsFinished', verifyAdmin, async(req, res) => {
    try {
      const response = await queries.setProposalAsFinished(
        {
          address: req.body.address,
        });
      return res.send(response)
    } catch (error) {
      console.log('Error setProposalAsFinished', error);
      return res.sendStatus(500);
    }
  })
  
  
  httpApp.get('/candidates', async(req, res) => {
    try {
      const candidates = await queries.getCandidate({
        address:req.query.election_address
      });
      return res.send(candidates)
    } catch (error) {
      console.log('Error fetch candidates', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/electionVisibility', async(req, res) => {
    try {
      const electionVisibility = await queries.getElectionVisibility({
        address:req.query.election_address
      });
      return res.send(electionVisibility)
    } catch (error) {
      console.log('Error fetch election visibility', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/getVotes', async(req, res) => {
    try {
      const votes = await queries.getVotes({
        address:req.query.election_address
      });

      var data = votes.map(x => x.id_candidate)

      return res.send(data)
    } catch (error) {
      console.log('Error fetch getVotes', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.get('/getResult', async(req, res) => {
    try {
       const candidates = await queries.getCandidate({
        address:req.query.election_address
       });

      const votesDB = await queries.getVotes({
        address:req.query.election_address
        });
  
      var votesArray = votesDB.map(x => x.id_candidate)  
      const key = new NodeRSA(req.query.RSAkey)
      var votesDecrypted = votesArray.map((vote, index) => {
        return key.decrypt(vote, 'utf8');
       })

      await Promise.all(votesDecrypted.map(async (voteDecrypted, index) => {
          await queries.decryptVote({
          id_candidate_decrypted:voteDecrypted,
          id_candidate_encrypted: votesArray[index]
        });
      }))

       var counts = {};

       for (var i = 0; i < votesDecrypted.length; i++) {
         var num = votesDecrypted[i];
         counts[num] = counts[num] ? counts[num] + 1 : 1;
       }

      if(candidates[0] != undefined){
        candidates.map((candidate, index) => {
          candidate.numberOfVotes = counts[index + 1]
        })
      }
      
      return res.send(candidates)
    } catch (error) {
      console.log('Error fetch getResult', error.message);
      return res.sendStatus(500);
    }
  })


  httpApp.get('/getResultProposal', async(req, res) => {
    try {
      const votesDBProposal = await queries.getVotesProposal({
        address:req.query.election_address
        });
  
      var votesArray = votesDBProposal.map(x => x.id_candidate)  
      const key = new NodeRSA(req.query.RSAkey)
      var votesDecrypted = votesArray.map((vote, index) => {
        return key.decrypt(vote, 'utf8');
       })

       await Promise.all(votesDecrypted.map(async (voteDecrypted, index) => {
        await queries.decryptVoteProposal({
        id_candidate_decrypted:voteDecrypted,
        id_candidate_encrypted: votesArray[index]
      });
    }))

      var occurrences = { };
      for (var i = 0, j = votesDecrypted.length; i < j; i++) {
        occurrences[votesDecrypted[i]] = (occurrences[votesDecrypted[i]] || 0) + 1;
      }

      var myJSON = JSON.stringify(occurrences);
      var JSONString = JSON.stringify(myJSON);


      return res.send(JSONString)
    } catch (error) {
      console.log('Error fetch getResultProposal', error.message);
      return res.sendStatus(500);
    }
  })
  
  httpApp.put('/setFinishedUploadedProposal', verifyFactory, async(req, res) => {
    try {
        resp = await queries.setFinishedUploadedProposal({address:req.body.election_address});
        return res.send(resp)
    } catch (error) {
      console.log('Error put setFinishedUploadedProposal', error.message);
      return res.sendStatus(500);
    }
  })
  
  
  httpApp.get('/getNumOfVotes', async(req, res) => {
    try {
      const numOfVotes = await queries.getNumOfVotes({
        address:req.query.election_address,
        type:req.query.type
      });
      return res.send(numOfVotes)
    } catch (error) {
      console.log('Error fetch getNumOfVotes', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.get('/electionDescription', async(req, res) => {
    try {
      const desc = await queries.getDescriptionOfElection({
        address:req.query.election_address
      });
      return res.send(desc)
    } catch (error) {
      console.log('Error fetch electionDescription', error);
      return res.sendStatus(500);
    }
  })
  
  
  httpApp.get('/getUserVote', async(req, res) => {
    try {
      const vote = await queries.getVotesResults({
        address:req.query.election_address,
      });	

      let key = new NodeRSA(({b: 512}));
      try{
        key.importKey(req.query.key, 'pkcs8-private-pem')
      } catch (e) {
        return res.send('Nepodarilo sa naimportovat spravne kluc. Je kluc spravny?')
      }


      let decrypted = ''
      vote.forEach((v) => {
        try{
          decrypted = key.decrypt(v['id_voter'], 'utf8');
        } catch (e) {
          console.log(e.message)
        }
      })

      return res.send(decrypted)
    } catch (error) {
      console.log('Error fetch getUserVote', error);
      return res.sendStatus(500);
    }
  })

    httpApp.get('/getUserVoteProposal', async(req, res) => {
    try {
      const vote = await queries.getVotesResultsProposal({
        address:req.query.election_address,
      });	

      let key = new NodeRSA(({b: 512}));
      try{
        key.importKey(req.query.key, 'pkcs8-private-pem')
      } catch (e) {
        return res.send('Nepodarilo sa naimportovat spravne kluc. Je kluc spravny?')
      }


      let decrypted = ''
      vote.forEach((v) => {
        try{
          decrypted = key.decrypt(v['id_voter'], 'utf8');
        } catch (e) {
          console.log(e.message)
        }
      })

      return res.send(decrypted)
    } catch (error) {
      console.log('Error fetch getUserVoteProposal', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/didUserVote', async(req, res) => {
    try {
      const vote = await queries.didUserVote({
        address:req.query.election_address,
        id_voter:req.query.id_voter
      });	


      return res.send(vote)
    } catch (error) {
      console.log('Error fetch didUserVote', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/didUserVoteProposal', async(req, res) => {
    try {
      const vote = await queries.didUserVoteProposal({
        address:req.query.election_address,
        id_voter:req.query.id_voter
      });	


      return res.send(vote)
    } catch (error) {
      console.log('Error fetch didUserVoteProposal', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/getVotedInElection', async(req, res) => {
    try {
      const vote = await queries.getVotedInElection({
        address:req.query.election_address,
        id_voter:req.query.id_voter
      });	

      return res.send(vote)
    } catch (error) {
      console.log('Error fetch getVotedInElection', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/votedInElection', async(req, res) => {
    try {
      const vote = await queries.votedInElection({
        address:req.query.election_address,
        id_voter:req.query.id_voter 
      });	

      return res.send(vote)
    } catch (error) {
      console.log('Error fetch votedInElection', error);
      return res.sendStatus(500);
    }
  })

    httpApp.get('/votedInProposal', async(req, res) => {
    try {
      const vote = await queries.votedInProposal({
        address:req.query.election_address,
        id_voter:req.query.id_voter 
      });	

      return res.send(vote)
    } catch (error) {
      console.log('Error fetch votedInProposal', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/getUserIsListedInElection', async(req, res) => {
    try {
      const vote = await queries.getUserIsListedInElection({
        address:req.query.election_address,
        id_voter:req.query.id_voter 
      });	
      return res.send(vote)
    } catch (error) {
      console.log('Error fetch getUserIsListedInElection', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.post('/verifyBchTreeEthTreeKey', async(req, res) => {
    try {
      const vote = await queries.getUserVoteCanId({
        address:req.body.election_address,
        id_voter:req.body.id_voter 
      });	
      const key = new NodeRSA(req.body.key)
      const decrypted = key.decrypt(vote[0]['id_candidate'], 'utf8');
      const candidate = await queries.getCandidateById({
        address:req.body.election_address,
        id:decrypted
      });	
      return res.send(candidate)
    } catch (error) {
      console.log('Error fetch verifyVoteKey', error);
      return res.sendStatus(500)
    }
  })
  
  httpApp.post('/verifyBchTreeEthTree', async(req, res) => {
    try {
      const votes = await queries.getAllUserVote({
        address:req.body.election_address,
      });	
  
      var data = votes.map(x => x.id_candidate)
      const leaves = data.map(x => SHA256(x))
      const tree = new MerkleTree(leaves, SHA256)
      const root = tree.getRoot().toString('hex')
  
      return res.send(root)
    } catch (error) {
      console.log('Error fetch verifyBchTreeEthTree', error);
      return res.sendStatus(500);
    }
  })

    httpApp.post('/verifyBchTreeEthTreeProposal', async(req, res) => {
    try {
      const votes = await queries.getAllUserVoteProposal({
        address:req.body.election_address,
      });	
  
      var data = votes.map(x => x.id_candidate)
      const leaves = data.map(x => SHA256(x))
      const tree = new MerkleTree(leaves, SHA256)
      const root = tree.getRoot().toString('hex')
  
      return res.send(root)
    } catch (error) {
      console.log('Error fetch verifyBchTreeEthTreeProposal', error);
      return res.sendStatus(500);
    }
  })
  
  
  httpApp.get('/getMerkleRoot', async(req, res) => {
    try {
      const root = await queries.getMerkleRoot({
        address:req.query.election_address,
        id_voter:req.query.id_voter 
      });	
      return res.send(root)
    } catch (error) {
      console.log('Error fetch getMerkleRoot', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.put('/newElection', verifyFactory, async(req, res) => {
    try {
      const response = await queries.newElection(
        {
          nameOfTheElection:req.body.nameOfTheElection,
          descriptionOfElection: req.body.descriptionOfElection,
          address: req.body.address
        });
      return res.send(response)
    } catch (error) {
      console.log('Error put newElection', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.put('/newCandidate', verifyAdmin, async(req, res) => {
    try {
      const response = await queries.newCandidate(
        {
          first_name:req.body.first_name,
          last_name: req.body.last_name,
          description: req.body.description,
          address: req.body.address,
          candidate_election_id: parseInt(req.body.candidate_election_id)
        });
      return res.send(response)
    } catch (error) {
      console.log('Error put newCandidate', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.post('/newVote',verifyVoter, async(req, res) => {
    const rsa_pub_key_election = req.body.rsa_pub_key  
    const keyCandidate = new NodeRSA({b: 512});
    const keyVoter = new NodeRSA({b: 512});

    keyCandidate.importKey(rsa_pub_key_election, 'pkcs8-public-pem')

    const candidate = keyCandidate.encrypt(req.body.id_candidate, 'base64');
    const voter = keyVoter.encrypt(req.body.id_voter, 'base64')

    const privateKeyVoter = keyVoter.exportKey('pkcs8-private-pem')

    try {
      const response = await queries.newVote(
        {
          address_election:req.body.address,
          candidate_id: candidate,
          voter_id: voter,      
        });
      return res.send(privateKeyVoter)
    } catch (error) {
      console.log('Error put newVote', error);
      return res.sendStatus(500);
    }
  })

  httpApp.post('/newVoteProposal', verifyVoter, async(req, res) => {

    try {
    const rsa_pub_key_election = req.body.rsa_pub_key  
    const keyCandidate = new NodeRSA({b: 512});
    const keyVoter = new NodeRSA({b: 512});

    keyCandidate.importKey(rsa_pub_key_election, 'pkcs8-public-pem')

    const candidate = keyCandidate.encrypt(req.body.id_candidate, 'base64');
    const voter = keyVoter.encrypt(req.body.id_voter, 'base64')

    const privateKeyVoter = keyVoter.exportKey('pkcs8-private-pem')
 
      const response = await queries.newVoteProposal(
        {
          address_election:req.body.address,
          candidate_id: candidate,
          voter_id: voter,      
        });
      return res.send(privateKeyVoter)
    } catch (error) {
      console.log('Error put newVoteProposal', error);
      return res.sendStatus(500);
    }
  })

  httpApp.put('/newVoteLDAP', verifyVoter, async(req, res) => {
    try {
      const response = await queries.newVoteLDAP(
        {
          address_election:req.body.address,
          voter_id: req.body.id_voter
        });
      return res.send(response)
    } catch (error) {
      console.log('Error put newVoteLDAP', error);
      return res.sendStatus(500);
    }
  })

  
  httpApp.put('/newVoteLDAPProposal', verifyVoter, async(req, res) => {
    try {
      const response = await queries.newVoteLDAPProposal(
        {
          address_election:req.body.address,
          voter_id: req.body.id_voter
        });
      return res.send(response)
    } catch (error) {
      console.log('Error put newVoteLDAPProposal', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/newRSAKeys', async(req, res) => {
    let RSAKey = {
      publicPem: '',
      privatePem: ''
    }
    try {
      const key = new NodeRSA({b: 512 });
      RSAKey.publicPem = key.exportKey('pkcs8-public-pem');
      RSAKey.privatePem = key.exportKey('pkcs8-private-pem');
      return res.send(RSAKey)
    } catch (error) {
      console.log('Error generating public RSA keys', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.get('/getIsCreated', async(req, res) => {
    try {
      const address = req.query.election_address
      const isCreated = await queries.getIsCreated({
        address: address
        });
      return res.send(isCreated)
    } catch (error) {
      console.log('Error get getIsCreated', error);
      return res.sendStatus(500);
    }
  })
  
  
  httpApp.get('/getElection', async(req, res) => {
    try {
      const address = req.query.election_address
      const el = await queries.getElection({
        address: address
        });
      return res.send(el)
    } catch (error) {
      console.log('Error get getIsCreated', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.get('/createMerkleRoot', async(req, res) => {
    try {

      const address = req.query.address
      const votes = await queries.getNonVotes({
        address: address
        });
      
      
      if(votes.length > 0){
      var data = votes.map(x => x.id_candidate)
      const leaves = data.map(x => SHA256(x))
      const tree = new MerkleTree(leaves, SHA256)
      const root = tree.getRoot().toString('hex')
      const dataToReturn = {root: root, numberOfVotes: data.length}

      await queries.updateNonVotesToPending({
        address:address
      });
      return res.send(dataToReturn)
    } else {
      return res.send({numberOfVotes: 0})
    }
    } catch (error) {
      console.log('Error put createStoreUploadMerkle', error);
      return res.sendStatus(500);
    }
  })

  httpApp.get('/createMerkleRootProposal', async(req, res) => {
    try {
      const address = req.query.address
      const votes = await queries.getNonVotesProposal({
        address: address
        });
      
      
      if(votes.length > 0){
      var data = votes.map(x => x.id_candidate)
      const leaves = data.map(x => SHA256(x))
      const tree = new MerkleTree(leaves, SHA256)
      const root = tree.getRoot().toString('hex')
      const dataToReturn = {root: root, numberOfVotes: data.length}

      await queries.updateNonVotesToPendingProposal({
        address:address
      });
      return res.send(dataToReturn)
    } else {
      return res.send({numberOfVotes: 0})
    }
    } catch (error) {
      console.log('Error put createStoreUploadMerkle', error);
      return res.sendStatus(500);
    }
  })
  
  httpApp.put('/updatePendingVotesToStored', verifyAdmin, async(req, res) => {
    try {
      const address = req.body.address
      const root = req.body.root
  
      response = await queries.updatePendingVotesToStored({
        address:address,
        root: root
      });
      return res.send(response)
    } catch (error) {
      console.log('Error put updatePendingVotesToStored', error);
      return res.sendStatus(500);
    }
  })

  httpApp.put('/updatePendingVotesToStoredProposal', verifyAdmin, async(req, res) => {
    try {
      const address = req.body.address
      const root = req.body.root
  
      response = await queries.updatePendingVotesToStoredProposal({
        address:address,
        root: root
      });
      return res.send(response)
    } catch (error) {
      console.log('Error put updatePendingVotesToStoredProposal', error);
      return res.sendStatus(500);
    }
  })

  httpApp.use(handler)

  const port = process.env.PORT || 3000;
  httpApp.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`)}); 
})