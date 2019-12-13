const connection = require('./connection')
var mysql = require('mysql');

const getCandidate = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = "SELECT * FROM candidate WHERE election_address = ?";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);

		const res = await pool.query(sql)
		await pool.end()
		return res.rows;
	} catch (error){
		console.log('db error', error)
		}
}

const getIsAdminUser = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = "SELECT isAdmin FROM eligibleVoter WHERE id_election = ? AND id_voter = ?";
		var inserts = [props.address, props.id_voter];
		sql = mysql.format(sql, inserts);

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
		var sql = "SELECT description FROM election WHERE election_address = ?";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);

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
		var sql = "SELECT id_candidate FROM vote WHERE id_election = ? AND stored_on_eth = '0';";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);

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
		var sql = "SELECT id_candidate FROM voteProposal WHERE id_election = ? AND stored_on_eth = '0';";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);

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
		var sql = "SELECT id_candidate FROM vote WHERE id_election = ?;";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);

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
		var sql = "SELECT id_candidate FROM voteProposal WHERE id_election = ?;";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);
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
		var sql = "SELECT * FROM vote WHERE id_election = ?;";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);

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
		var sql = "SELECT is_created FROM election WHERE election_address= ?;";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);

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
		var sql = "SELECT COUNT(*) FROM vote WHERE id_election = ? AND stored_on_eth = ?;";
		var inserts = [props.address,props.type];
		sql = mysql.format(sql, inserts);

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
		var sql = "UPDATE vote SET stored_on_eth = 'pending' WHERE id_election = ? AND stored_on_eth = '0;";
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);

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
		? AND stored_on_eth = '0';`
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const updatePendingVotesToStored = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE vote SET stored_on_eth = '1', merkle_root= ?
		WHERE id_election = ?
		 AND stored_on_eth = 'pending';`
		 var inserts = [props.root,props.address];
		 sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const updatePendingVotesToStoredProposal = async(props) => {
	const pool = connection.getPool();
	try{
		
		var sql = `UPDATE voteProposal SET stored_on_eth = '1', merkle_root= ? 
		WHERE id_election = ?
		 AND stored_on_eth = 'pending';`
		 var inserts = [props.root,props.address];
		 sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const decryptVote = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE vote SET id_decrypted_candidate = ? WHERE id_candidate = ?;`
		var inserts = [props.id_candidate_decrypted,props.id_candidate_encrypted];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const decryptVoteProposal = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE voteProposal SET id_decrypted_candidate = ? WHERE id_candidate = ?;`
		var inserts = [props.id_candidate_decrypted,props.id_candidate_encrypted];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
		}
}

const addRSAPubKey = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `UPDATE election SET rsa_pub_key = ? WHERE election_address =?`
		var inserts = [props.RSAPubKey,props.address];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)

		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const setElectionAsCreatedWithKeys = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `UPDATE election SET is_created = 'created_with_keys'
				WHERE election_address = ?`
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);
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
				WHERE election_address = ?`
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);
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
				WHERE election_address = ?`
		var inserts = [props.address];
		sql = mysql.format(sql, inserts);
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
				WHERE election_address = ?`

		var inserts = [props.address];
		sql = mysql.format(sql, inserts);
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
				WHERE election_address = ?`

		var inserts = [props.address];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}


const getUserIsListedInElection = async(props) => {
	const pool = connection.getPool();
	try{
		var sql = `SELECT * FROM voter WHERE id_election = ? AND id_voter = ?;`

		var inserts = [props.address, props.id_voter];
		sql = mysql.format(sql, inserts);
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
		var sql = `SELECT * FROM voter WHERE id_election = ? AND id_voter = ? ;`

		var inserts = [props.address, props.id_voter];
		sql = mysql.format(sql, inserts);		
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
		var sql = `SELECT * FROM voterProposal WHERE id_election = ? AND id_voter = ? ;`

		var inserts = [props.address, props.id_voter];
		sql = mysql.format(sql, inserts);
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
		var sql = `SELECT id_candidate FROM vote WHERE id_election = ?;`

		var inserts = [props.address];
		sql = mysql.format(sql, inserts);
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
		var sql = `SELECT id_candidate FROM vote WHERE id_election = ? AND id_voter = ? ;`

		var inserts = [props.address, props.id_voter];
		sql = mysql.format(sql, inserts);
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
		var sql = `SELECT * FROM voter WHERE id_election = ? AND id_voter = ? ;`

		var inserts = [props.address, props.id_voter];
		sql = mysql.format(sql, inserts);
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
		var sql = `SELECT first_name, last_name FROM candidate WHERE election_address = ? AND candidate_contract_id = ?;`

		var inserts = [props.address, props.id];
		sql = mysql.format(sql, inserts);
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
		var sql = `SELECT merkle_root FROM vote WHERE id_election = ? AND id_voter = ? ;`

		var inserts = [props.address, props.id_voter];
		sql = mysql.format(sql, inserts);
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

		var sql = `INSERT INTO election (name, description, election_address, is_created) VALUES (?,?,?,'created_no_keys');`
		var inserts = [props.nameOfTheElection, props.descriptionOfElection, props.address];
		sql = mysql.format(sql, inserts);

		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}


const newVote = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO vote (id_election, id_candidate, id_voter, stored_on_eth, merkle_root) VALUES (?,?,?,'0', '0')`

		var inserts = [props.address_election, props.candidate_id, props.voter_id];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newVoteProposal = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO voteProposal (id_election, id_candidate, id_voter, stored_on_eth, merkle_root) VALUES (?,?,?,'0', '0')`
		var inserts = [props.address_election, props.candidate_id, props.voter_id];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newVoteLDAP = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO voter (id_election, id_voter) VALUES (?,?)`
		var inserts = [props.address_election, props.voter_id];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newVoteLDAPProposal = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO voterProposal (id_election, id_voter) VALUES (?,?)`
		var inserts = [props.address_election, props.voter_id];
		sql = mysql.format(sql, inserts);
		await pool.query(sql)
		await pool.end()
	} catch (error){
		console.log('db error', error)
	}
}

const newVoter = async(props) => {
	const pool = connection.getPool();
	try{
		sql = `INSERT INTO eligibleVoter (id_election, id_voter, isAdmin) VALUES (?,?,?)`
		var inserts = [props.address_election, props.voter_id, props.isAdmin];
		sql = mysql.format(sql, inserts);
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
			?,?,?,'0',?,?,?)`
		var inserts = [props.first_name, props.last_name, props.description, props.address, props.hashed_number, props.candidate_election_id];
		sql = mysql.format(sql, inserts);
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
	setFinishedUploadedProposal,
	decryptVoteProposal,
	getIsAdminUser
}