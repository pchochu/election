const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledElection = require('./build/ElectionFactory.json')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const provider = new HDWalletProvider(
	process.env.ethPhrase,
	process.env.infuraNode
	);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attemting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(compiledElection.interface))
		.deploy({ data: '0x' + compiledElection.bytecode })
		.send({ gas: '2000000', from:accounts[0] });

	console.log('Contract deployed to', result.options.address);
};

deploy();