import React, {Component} from 'react'
import Layout from '../../../components/Layout'
import Election from '../../../ethereum/election'
import {Form, Button, Message, Input, Accordion, Label} from 'semantic-ui-react'
import axios from 'axios';
const jwt = require('jsonwebtoken')
const {constants} = require('../../../helper/constants').default;

class CandidateNew extends Component{
	state = {
		login: '',
		errorMessage: '',
		key: '',
		password: ''
	};


	static async getInitialProps(props){
		const {address, id} = props.query;
		const election = Election(address);

		const candidateCount = await election.methods.getCandidateCount().call()
		{/* ----NACITANIE ARRAYU Z ETH KONTRAKTU----*/}
			const candidatesEthereum = await Promise.all(
			Array(parseInt(candidateCount))
				.fill()
				.map((element, index) => {
				return election.methods.candidates(index).call()
			})
		);
		return {
			address: address,
			id: id,
			ethCandidates:candidatesEthereum,
		};
	}

	downloadTxtFile = () => {
		const element = document.createElement("a");
		const file = new Blob([this.state.key], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = this.state.login + " privateKeyForVote.txt";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	}
	onSubmit = async event => {
		event.preventDefault();
		this.setState({ errorMessage: '' })
		this.setState({ key: '' })

		if (this.state.login === '') {
			this.setState({ errorMessage: 'Nevyplnený login' })
			return
		}

		if (this.state.password === '') {
			this.setState({ errorMessage: 'Nevyplnene heslo' })
			return
		}

		try{

			let log = await axios.post(constants.ADDRESS + '/login',
			{ 
					username:this.state.login,
					password: this.state.password,
			})

			if(log.data.response == 'notAuth'){
				this.setState({errorMessage: 'Nespavne prihlasovacie udaje'})
				return
			} 

			let isAuth = await axios.post(constants.ADDRESS + '/authenticate',
			{ 
					username:this.state.login,
					password: this.state.password,
					address:this.props.address,
					type:'0'
			})

			const vote = await axios.get(constants.ADDRESS + '/didUserVote',
			{ 
				params: {
					election_address:this.props.address,
					id_voter:this.state.login
				}
			});
			

			if(vote.data.length > 0){
				this.setState({ errorMessage: "Už si hlasoval, nemôžes hlasovať viac krát"})
				return
			}
			
			const election = await Election(this.props.address)
			const rsa_pub_key = await election.methods.RSA_pub_key().call()

			const response = await axios.post(constants.ADDRESS +  '/newVote', 
			{
				headers: {
					'Content-Type': 'application/json',
					'token': isAuth.data
				},
				address: this.props.address,
				id_candidate: this.props.id,
				id_voter: this.state.login,
				rsa_pub_key: rsa_pub_key
			})

			const responseLDAP = await axios.put(constants.ADDRESS +  '/newVoteLDAP', 
			{
				headers: {
					'Content-Type': 'application/json',
					'token': isAuth.data
				},
				address: this.props.address,
				id_voter: this.state.login
			})


			this.setState({ key: response.data})

			this.downloadTxtFile()
			alert('Vyborne, zahlasoval si a stiahol sa ti privatny kluc')

      }catch (e){
		  this.setState({errorMessage: 'Problem s hlasovanim'})
	  }

	};

	render(){
		return(
			<Layout>
				<h3>Odoslanie hlasu</h3>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.key}>
						<Form.Field required>
							<label>Login</label>
							<Input 
								placeholder='Login'
								value={this.state.login}
								onChange={event =>{this.setState({errorMessage:''}), this.setState({login: event.target.value})}}
							/>
						</Form.Field>

						<Form.Field required>
							<label>Heslo</label>
							<Input 
								type="password"
								placeholder='Heslo'
								value={this.state.password}
								onChange={event =>{this.setState({errorMessage:''}), this.setState({password: event.target.value})}}
							/>
						</Form.Field>

						<Message error header="Ojoj, niečo sa pokazilo!" content={this.state.errorMessage} />
						<Message success header='Výborne!' content={'Vyborne zahlasoval si a stiahol sa ti kluc!'}/>
						<Button color={constants.COLOR} >Odošli hlas</Button>	
					</Form>

					<Accordion style={{ marginTop: '50px', marginBottom: '50px' }}> 
						<Label color={constants.COLOR} size={'medium'}>
                            Privátny RSA klúč
                        </Label> 
						<Button color={constants.COLOR} onClick={this.downloadTxtFile }>Stiahni</Button>
				</Accordion>
			</Layout>
			);
	}
}

export default CandidateNew;