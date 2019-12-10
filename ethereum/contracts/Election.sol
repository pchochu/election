pragma solidity ^0.4.25;

contract ElectionFactory{
    address[] public deployedElections;
    uint last_election_id = 1;
    mapping(address => bool) public administrators;
    
    
    modifier restricted(){
        require(administrators[msg.sender]);
        _;
    }
    
    constructor() public {
        administrators[msg.sender] = true;
    }
    
    function createElection(string name, address admin, uint proposalSet, uint proposalRunning) public restricted{
        address newElection = new Election(msg.sender, last_election_id, name, admin, proposalSet, proposalRunning);
        deployedElections.push(newElection);
        last_election_id++;
    }
    
    function getDeployedElections() public view returns (address[]){
        return deployedElections;
    }
    
    function getLastElectionAddress() public view returns (address){
        return deployedElections[last_election_id-2];
    }
    
}

contract Election{
    struct Candidate{
        uint id_candidate;
        string first_name;
        string last_name;
    }
    
    address public manager; 
    mapping(address => bool) public administrators;
    mapping(address => bool) public approversToStart;
    mapping(address => bool) public apporversToFinish;
    mapping(address => bool) public approversToStartProposal;
    mapping(address => bool) public apporversToFinishProposal;
    uint public administratorsCount;
    uint public approvalsToStartCount;
    uint public approvalsToFinishCount;
    uint public approvalsToStartProposalCount;
    uint public approvalsToFinishProposalCount;
    Candidate[] public candidates;
    mapping(bytes32 => bool) public hashes;
    uint public last_candidate_id;
    uint id_election;
    string name_of_election;
    string public RSA_pub_key = '';
    uint public id_winner;
    uint public winner_num_of_votes;
    uint public proposalIsSet;
    uint public proposalIsRunning;
    string public proposal_result;
    
    modifier restricted(){
        require(administrators[msg.sender]);
        _;
    }
    
    constructor(address creator, uint setIdElection, string election_name, address admin, uint proposalSet, uint proposalRunning) public {
        manager = creator;
        administrators[admin] = true; 
        administratorsCount = 1;
        last_candidate_id = 0;
        id_election = setIdElection; 
        name_of_election = election_name;
        proposalIsRunning = proposalRunning;
        proposalIsSet = proposalSet;
    }
    
    function setProposalIsSet() public {
        require(manager == msg.sender);
        proposalIsRunning = 0;
    }
    
    function createCandidate(string first_name, string last_name) public restricted{
        last_candidate_id++;
        Candidate memory  newCandidate = Candidate({
            id_candidate: last_candidate_id,
            first_name: first_name,
            last_name: last_name
        });
        
        candidates.push(newCandidate);
    }
    
    function setRSAPubKey(string RSAPubKey) public{
        require(bytes(RSA_pub_key).length == 0);
        require(bytes(RSAPubKey).length > 0);
        RSA_pub_key = RSAPubKey;
    }
    
    function setWinner(uint id, uint numOfVotes) public{
        require(id_winner == 0);
        require(administratorsCount == approvalsToFinishCount);
        require(msg.sender == manager);
        id_winner = id;
        winner_num_of_votes = numOfVotes;
    }

    function setResultOfProposal(string resultOfProposal) public{
        require(keccak256(proposal_result) == keccak256(''));
        require(administratorsCount == approvalsToFinishProposalCount);
        require(msg.sender == manager);
        proposal_result = resultOfProposal;
    }
    
    function addHashOfVotes(bytes32 hash) public restricted{
        hashes[hash] = true;
    }
    
    function createAdministrator(address administrator) public restricted{
        administrators[administrator] = true;
        administratorsCount++;
    }
    
    function createApprovalToStart(address administrator) public restricted{
        approversToStart[administrator] = true;
        approvalsToStartCount++;
    }
    
    function createApprovalToFinish(address administrator) public restricted{
        apporversToFinish[administrator] = true;
        approvalsToFinishCount++;
    }
    
    function createApprovalToStartProposal(address administrator) public restricted{
    approversToStartProposal[administrator] = true;
    approvalsToStartProposalCount++;
    }
    
    function createApprovalToFinishProposal(address administrator) public restricted{
        apporversToFinishProposal[administrator] = true;
        approvalsToFinishProposalCount++;
    }
    

    function getSummary() public view returns  (address, uint, uint, string, uint){
        return (
                manager,
                candidates.length,
                id_election,
                name_of_election,
                administratorsCount
            );
    }

    function getCandidateCount() public view returns (uint){
        return candidates.length;
    }
}