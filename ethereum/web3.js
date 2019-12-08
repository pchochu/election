import Web3 from 'web3';

var web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
		web3 = new Web3(window.web3.currentProvider);
} else {
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/v3/0679d2fa114c4afd80d8924049a5fe55'
		);
	web3 = new Web3(provider);
}

export default web3;

