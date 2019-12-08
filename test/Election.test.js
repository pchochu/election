const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/ElectionFactory.json');
const compilerElection = require('../ethereum/build/Election.json');

let accounts;
let factory;
let electionAddress;
let election;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({data:compiledFactory.bytecode})
		.send({from:accounts[0], gas: '1000000'});

	await factory.methods.createElection().send({
		from:accounts[0],
		gas: '1000000'
	});

	[electionAddress] = await factory.methods.getDeployedElections().call();

	election = await new web3.eth.Contract(
		JSON.parse(compilerElection.interface),
		electionAddress
		);

});

describe('Elections', () => {
	it('deploys a factory and a election', () => {
		assert.ok(factory.options.address);
		assert.ok(election.options.address);
	});
});