import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Input, Message, TextArea } from 'semantic-ui-react';
import Election from '../../../ethereum/election'
import axios from 'axios';
const {constants} = require('../../../helper/constants').default;
import web3 from '../../../ethereum/web3';


class ElectionNew extends Component {
	state = {
		address: '',
		name:'',
		key:'',
		// keyProposal: '',
		errorMessage: '',
		msg: '',
		// msgProposal: ''
	};

	static async getInitialProps(props) {
		
		const address = props.query.address
		const election = Election(address);
		
		let isAddress
		try {
			isAddress = web3.utils.isAddress(address)
		  } catch(e) { 
			console.error('invalid ethereum address', e.message) 
		  }

		// const isProposal = await election.methods.proposalIsSet().call()

	 return {address, isAddress}
	}
	

	getVoted = async () => {
		const vote = await axios.get(constants.ADDRESS + '/votedInElection',
		{ 
			params: {
				election_address:this.props.address,
				id_voter:this.state.name,
			}
		});

		return vote
	}

	// getVotedProposal = async () => {
	// 	const vote = await axios.get(constants.ADDRESS + '/votedInProposal',
	// 	{ 
	// 		params: {
	// 			election_address:this.props.address,
	// 			id_voter:this.state.name,
	// 		}
	// 	});

	// 	return vote
	// }

	getCrypto = async () => {
		const vote = await axios.get(constants.ADDRESS + '/getUserVote',
		{ 
			params: {
				election_address:this.props.address,
				key:this.state.key,
			}
		});

		return vote
	}

	// getCryptoProposal = async () => {
	// 	const vote = await axios.get(constants.ADDRESS + '/getUserVoteProposal',
	// 	{ 
	// 		params: {
	// 			election_address:this.props.address,
	// 			key:this.state.keyProposal,
	// 		}
	// 	});

	// 	return vote
	// }

    onSubmit = async (event) => {

		try{
			if(!this.props.isAddress){
				this.setState({errorMessage: 'Neplatna Ethereova adresa'})
				return
			}

			const election = Election(this.props.address);
			const approvalsToStart = await election.methods.approvalsToStartCount().call()

			this.setState({errorMessage: ''})

			if(this.state.name == ''){
				this.setState({errorMessage: 'Nevyplnil si login'})
				return
			}

			if(this.state.key == ''){
				this.setState({errorMessage: 'Nevyplnil si RSA kluc'})
				return
			}

			// if(this.props.isProposal == 1){
			// 	if(this.state.keyProposal == ''){
			// 		this.setState({errorMessage: 'Nevyplnil si RSA kluc z navrhoveho kola'})
			// 		return
			// 	}
			// }
			
			const voted = await this.getVoted()

			// if(this.props.isProposal == 1){
			// 	const votedProposal = await this.getVotedProposal()
			// }

			if(voted.data[0] === undefined){
				this.setState({errorMessage: 'Hlas s daným loginom sa nenachádza v DB'})
				return
			} else{
				this.setState({msg: 'Hlas sa nachádza v DB '})
			}

			// if(this.props.isProposal == 1){
			// 	if(votedProposal.data[0] === undefined){
			// 		this.setState({errorMessage: 'Hlas s daným loginom sa nenachádza v DB (navrhove kolo)'})
			// 		return
			// 	} else{
			// 		this.setState({msg: 'Hlas sa nachádza v DB (navrhove kolo)'})
			// 	}
			// }

			const crypto = await this.getCrypto()
			// const cryptoProposal = await this.getCryptoProposal()

			if(crypto.data != this.state.name){
				this.setState({errorMessage: 'Tvoj hlas sa nepodarilo desifrovat pomocou zadaneho kluca a mena'})
				return
			} else {
				this.setState({msg: "Tvoj hlas je spravne zasifrovany v DB"})
			}

			// if(this.props.isProposal == 1){
			// 	if(cryptoProposal.data != this.state.name){
			// 		this.setState({errorMessage: 'Tvoj hlas sa nepodarilo desifrovat pomocou zadaneho kluca a mena (navrhove kolo)'})
			// 		return
			// 	} else {
			// 		this.setState({msg: "Tvoj hlas je spravne zasifrovany v DB (navrhove kolo)"})
			// 	}
			// }
			
			const recreatedRoot = await axios.post(constants.ADDRESS + '/verifyBchTreeEthTree',
			{ 
					election_address:this.props.address
			});

			const recreatedRootEthComp = await election.methods.hashes("0x" + recreatedRoot.data).call();

			if(!recreatedRootEthComp){
				this.setState({errorMessage: 'Znovu vytvoreny strom nesuhlasi so stromom na ETH'})
				return
			} else{
				this.setState({msg: "Hlas je uložený v DB, na BCH, Merkle Rooty DB, ETH, znova vytvoreny strom sa zhoduju"})
			}

			// if(this.props.isProposal == 1){
			// 	const recreatedRootProposal = await axios.post(constants.ADDRESS + '/verifyBchTreeEthTreeProposal',
			// 	{ 
			// 			election_address:this.props.address
			// 	});

				
			// 	const recreatedRootEthCompProposal = await election.methods.hashes("0x" + recreatedRootProposal.data).call();

			// 	if(!recreatedRootEthCompProposal){
			// 		this.setState({errorMessage: 'Znovu vytvoreny strom nesuhlasi so stromom na ETH (navrhove kolo)'})
			// 		return
			// 	} else{
			// 		this.setState({msg: "Hlas je uložený v DB, na BCH, Merkle Rooty DB, ETH, znova vytvoreny strom sa zhoduju (navrhove kolo)"})
			// 	}
			// }

	} catch (error) {
		this.setState({errorMessage: error.message})
	}
	}

	// renProposal(){
	// 	if(this.props.isProposal == 1){
	// 	return <Form.Field>
	// 						<label>Volebný Klúč Návrhového Kola</label>
	// 						<TextArea
	// 							style={{ minHeight: 300 }}
	// 							value={this.state.keyProposal}
	// 							onChange={event => this.setState({ keyProposal: event.target.value })} />
	// 					</Form.Field>
	// 	}
	// }

	// renProposalMsg(){if(this.props.isProposal == 1){
	// 	<Message success
	// 							header='Výborne!'
	// 							content={this.state.msgProposal}
	// 						/>
	// }
	// }
	
	render() {	
		return (	
			<Layout>
				<h3> Kontrola hlasu </h3>
				<div>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.msg}>
						<Form.Field required>
							<label>Volebné meno</label>
							<Input
								placeholder='xlogin'
								value={this.state.name}
								onChange={event => this.setState({ name: event.target.value })}
							/>
						</Form.Field>

						<Form.Field>
							<label>Volebný Klúč</label>
							<TextArea
								style={{ minHeight: 300 }}
								value={this.state.key}
								onChange={event => this.setState({ key: event.target.value })} />
						</Form.Field>		
	
						<Message error header="Ojoj, niečo sa pokazilo!" content={this.state.errorMessage} />
						<Message success
								header='Výborne!'
								content={this.state.msg}
							/>
						
						<Button loading={this.state.loading} color={constants.COLOR}>Zkontroluj!</Button>
					</Form>
				</div>
			</Layout>
				
		);
	}
}

export default ElectionNew;