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
		errorMessage: '',
		msg: '',
	};

	static async getInitialProps(props) {

		const address = props.query.address
		
		let isAddress
		try {
			isAddress = web3.utils.isAddress(address)
		  } catch(e) { 
			console.error('invalid ethereum address', e.message) 
		  }

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
			
			const voted = await this.getVoted()

			if(voted.data[0] === undefined){
				this.setState({errorMessage: 'Hlas s daným loginom sa nenachádza v DB'})
				return
			} else{
				this.setState({msg: 'Hlas sa nachádza v DB '})
			}

			const crypto = await this.getCrypto()
			
			if(crypto.data != this.state.name){
				this.setState({errorMessage: 'Tvoj hlas sa nepodarilo desifrovat pomocou zadaneho kluca a mena'})
				return
			} else {
				this.setState({msg: "Tvoj hlas je spravne zasifrovany v DB"})
			}
			

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

	} catch (error) {
		this.setState({errorMessage: error.message})
	}
	}
	
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
							<label>Klúč</label>
							<TextArea
								style={{ minHeight: 300 }}
								placeholder='-----BEGIN RSA PRIVATE KEY-----
								MIICXAIBAAKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0FPqri0cb2JZfXJ/DgYSF6vUp
								wmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ5
								1s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQABAoGAFijko56+qGyN8M0RVyaRAXz++xTqHBLh
								3tx4VgMtrQ+WEgCjhoTwo23KMBAuJGSYnRmoBZM3lMfTKevIkAidPExvYCdm5dYq3XToLkkLv5L2
								pIIVOFMDG+KESnAFV7l2c+cnzRMW0+b6f8mR1CJzZuxVLL6Q02fvLi55/mbSYxECQQDeAw6fiIQX
								GukBI4eMZZt4nscy2o12KyYner3VpoeE+Np2q+Z3pvAMd/aNzQ/W9WaI+NRfcxUJrmfPwIGm63il
								AkEAxCL5HQb2bQr4ByorcMWm/hEP2MZzROV73yF41hPsRC9m66KrheO9HPTJuo3/9s5p+sqGxOlF
								L0NDt4SkosjgGwJAFklyR1uZ/wPJjj611cdBcztlPdqoxssQGnh85BzCj/u3WqBpE2vjvyyvyI5k
								X6zk7S0ljKtt2jny2+00VsBerQJBAJGC1Mg5Oydo5NwD6BiROrPxGo2bpTbu/fhrT8ebHkTz2epl
								U9VQQSQzY1oZMVX8i1m5WUTLPz2yLJIBQVdXqhMCQBGoiuSoSjafUhV7i1cEGpb88h5NBYZzWXGZ
								37sJ5QsW+sJyoNde3xH8vdXhzU7eT82D6X/scw9RZz+/6rCJ4p0=
								-----END RSA PRIVATE KEY-----'
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