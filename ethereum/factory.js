import web3 from './web3';
import ElectionFactory from './build/ElectionFactory.json'
const {constants} = require('../helper/constants').default;

const instance = new web3.eth.Contract(
	JSON.parse(ElectionFactory.interface),
	constants.FACTORY_ADDRESS 
);

export default instance;