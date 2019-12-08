const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledElection = require('./build/ElectionFactory.json')

const provider = new HDWalletProvider(
	'output earth elephant skirt couple print collect rail lonely steel trophy account',
	'https://rinkeby.infura.io/v3/0679d2fa114c4afd80d8924049a5fe55'
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