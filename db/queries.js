const connection = require('./connection')


const getCandidate = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT * FROM candidate WHERE election_address = 
		'`+props.address+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getDescriptionOfElection = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT description FROM election WHERE election_address = 
		'`+props.address+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getQN = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT g,n FROM election WHERE election_address = 
		'`+props.address+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getNonVotes = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT id_candidate FROM vote WHERE id_election = 
		'`+props.address+`' AND stored_on_eth = '0';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getNonVotesProposal = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT id_candidate FROM voteProposal WHERE id_election = 
		'`+props.address+`' AND stored_on_eth = '0';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getVotes = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT id_candidate FROM vote WHERE id_election = 
		'`+props.address+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getVotesProposal = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT id_candidate FROM voteProposal WHERE id_election = 
		'`+props.address+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getVotesResults = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT * FROM vote WHERE id_election = 
		'`+props.address+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getIsCreated = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT is_created FROM election WHERE election_address= 
		'`+props.address+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getNumOfVotes = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT COUNT(*) FROM vote WHERE id_election = 
		'`+props.address+`' AND stored_on_eth = '`+props.type+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const updateNonVotesToPending = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE vote SET stored_on_eth = 'pending' WHERE id_election = 
		'`+props.address+`' AND stored_on_eth = '0';`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const updateNonVotesToPendingProposal = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE voteProposal SET stored_on_eth = 'pending' WHERE id_election = 
		'`+props.address+`' AND stored_on_eth = '0';`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const updatePendingVotesToStored = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE vote SET stored_on_eth = '1', merkle_root= '`+props.root+`' 
		WHERE id_election = '`+props.address+`'
		 AND stored_on_eth = 'pending';`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const updatePendingVotesToStoredProposal = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE voteProposal SET stored_on_eth = '1', merkle_root= '`+props.root+`' 
		WHERE id_election = '`+props.address+`'
		 AND stored_on_eth = 'pending';`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const decryptVote = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE vote SET id_decrypted_candidate = '`+props.id_candidate_decrypted +`' WHERE id_candidate = 
		'`+props.id_candidate_encrypted+`';`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const addPubKey = async(props) => {
	const pool = connection.getPool();
	try{
		updateKeys = `UPDATE election SET g ='`+props.g+`', n= '`+props.n+`'
				WHERE election_address =
	   			'`+props.address+`'`
		await pool.query(updateKeys)

		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const addRSAPubKey = async(props) => {
	const pool = connection.getPool();
	try{
		updateKeys = `UPDATE election SET rsa_pub_key ='`+props.RSAPubKey+`' WHERE election_address =
	   			'`+props.address+`'`
		await pool.query(updateKeys)

		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const setElectionAsCreatedWithKeys = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `UPDATE election SET is_created = 'created_with_keys'
				WHERE election_address =
	   			'`+props.address+`'`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const setProposalAsCreatedWithKeys = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `UPDATE election SET is_created = 'created_proposal_with_keys'
				WHERE election_address =
	   			'`+props.address+`'`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const setElectionAsFinished= async(props) => {
	const pool = connection.getPool();
	try{
		sql = `UPDATE election SET is_created = 'finished_no_uploaded'
				WHERE election_address =
	   			'`+props.address+`'`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const setProposalAsFinished= async(props) => {
	const pool = connection.getPool();
	try{
		sql = `UPDATE election SET is_created = 'finished_proposal_no_uploaded'
				WHERE election_address =
	   			'`+props.address+`'`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const setFinishedUploadedProposal= async(props) => {
	const pool = connection.getPool();
	try{
		sql = `UPDATE election SET is_created = 'created_with_keys'
				WHERE election_address =
	   			'`+props.address+`'`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}


const getUserIsListedInElection = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT * FROM voter WHERE id_election = 
		'`+props.address+`' AND id_voter = '`+props.id_voter+`' ;`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const didUserVote = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT * FROM voter WHERE id_election = 
		'`+props.address+`' AND id_voter = '`+props.id_voter+`' ;`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const didUserVoteProposal = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT * FROM voterProposal WHERE id_election = 
		'`+props.address+`' AND id_voter = '`+props.id_voter+`' ;`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getAllUserVote = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT id_candidate FROM vote WHERE id_election = 
		'`+props.address+`';`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getUserVoteCanId = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT id_candidate FROM vote WHERE id_election = 
		'`+props.address+`' AND id_voter = '`+props.id_voter+`' ;`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const votedInElection = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT * FROM voter WHERE id_election = 
		'`+props.address+`' AND id_voter = '`+props.id_voter+`' ;`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getCandidateById = async(props) => {
	const pool = connection.getPool();
	console.log(props.address)
	console.log(props.id)
	try{
		var sql = `SELECT first_name, last_name FROM candidate WHERE election_address = 
		'`+props.address+`' AND candidate_contract_id = '`+props.id+`';`
		const res = await pool.query(sql)
		console.log(res)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getMerkleRoot = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT merkle_root FROM vote WHERE id_election = 
		'`+props.address+`' AND id_voter = '`+props.id_voter+`' ;`
		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const newElection = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO election (name, description, election_address, is_created) VALUES (
			'`+props.nameOfTheElection+`',
			'`+props.descriptionOfElection+`',
			'`+props.address+`',
			'created_no_keys')`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}


const newVote = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO vote (id_election, id_candidate, id_voter, stored_on_eth, merkle_root) VALUES (
			'`+props.address_election+`',
			'`+props.candidate_id+`',
			'`+props.voter_id+`',
			'0', '0')`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newVoteProposal = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO voteProposal (id_election, id_candidate, id_voter, stored_on_eth, merkle_root) VALUES (
			'`+props.address_election+`',
			'`+props.candidate_id+`',
			'`+props.voter_id+`',
			'0', '0')`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newVoteLDAP = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO voter (id_election, id_voter) VALUES (
			'`+props.address_election+`',
			'`+props.voter_id+`')`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newVoteLDAPProposal = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO voterProposal (id_election, id_voter) VALUES (
			'`+props.address_election+`',
			'`+props.voter_id+`')`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newVoter = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO voter (id_election, id_voter) VALUES (
			'`+props.address_election+`',
			'`+props.voter_id+`')`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newCandidate = async(props) => {
	const pool = connection.getPool();
	try{
		console.log('DB')
		console.log(props.candidate_election_id)
		sql = `INSERT INTO candidate (first_name, last_name, description, elected, election_address, number_of_votes_hash, candidate_contract_id) VALUES (
			'`+props.first_name+`',
			'`+props.last_name+`',
			'`+props.description+`',
			'0',
			'`+props.address+`',
			'`+props.hashed_number+`',
			`+props.candidate_election_id+`)`
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

module.exports = 
{
	setProposalAsCreatedWithKeys,
	setElectionAsCreatedWithKeys, 
	updatePendingVotesToStored, 
	updateNonVotesToPending, 
	getNonVotes, 
	newVote, 
	getCandidate, 
	newElection, 
	newCandidate, 
	getDescriptionOfElection, 
	addPubKey,
	getIsCreated,
	getNumOfVotes,
	getMerkleRoot,
	getAllUserVote,
	getUserVoteCanId,
	getCandidateById,
	setElectionAsFinished,
	newVoter,
	getUserIsListedInElection,
	addRSAPubKey,
	newVoteLDAP,
	getVotes,
	decryptVote,
	getVotesResults,
	didUserVote,
	votedInElection,
	newVoteProposal,
	didUserVoteProposal,
	newVoteLDAPProposal,
	updateNonVotesToPendingProposal,
	getNonVotesProposal,
	updatePendingVotesToStoredProposal,
	setProposalAsFinished,
	getVotesProposal,
	setFinishedUploadedProposal
}