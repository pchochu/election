import React, {Component} from 'react'
import Layout from '../../../components/Layout'
import Election from '../../../ethereum/election'
import web3 from '../../../ethereum/web3'
import {Router} from '../../../routes'
import {Form, Button, Message, Input, TextArea} from 'semantic-ui-react'
import axios from 'axios';
const {constants} = require('../../../helper/constants').default;

class CandidateNew extends Component{
	state = {
		first_name: '',
		last_name: '',
		description: '', 
		loading: false,
		errorMessage: '',
	};

	static async getInitialProps(props){
		const {address, req} = props.query;

		if(req){
			// server. mozno rovno robit SQL dotaz
		} 
			
		// prehliadac len mozne robit HTTP requesty
		//try {
		//	const response = await axios.get('http://localhost:4000/users');
			  
		//	users = response.data;
		//} catch(error) {
		//	console.log('err', error)
		//}
		
		return {address };
	}


	onSubmit = async event => {
		event.preventDefault();
		this.setState({loading:true, errorMessage: ''});
		
		if (this.state.first_name === ''){
			this.setState({errorMessage: 'Nevyplnené krstné meno kandidáta'})
			this.setState({loading:false});
			return
		}

		if (this.state.last_name === ''){
			this.setState({errorMessage: 'Nevyplnené priezvyska kandidáta'})
			this.setState({loading:false});
			return
		}

		const election = Election(this.props.address);
		const { first_name, last_name, description } = this.state;

		try{
			const accounts = await web3.eth.getAccounts();
			await election.methods
				.createCandidate(first_name, last_name)
				.send({from:accounts[0]});

		const candidate_election_id = await election.methods.last_candidate_id().call()
		axios.put(constants.ADDRESS + '/newCandidate', 
		{
			first_name: first_name,
			last_name: last_name,
			description: description,
			address: this.props.address,
			candidate_election_id: candidate_election_id
		}).catch(function (error) {
		console.log(error);
		});

			Router.back();
		}catch (e){
			this.setState({errorMessage: e.message});
		}

		this.setState({loading:false});
	};


	render(){
		return(
			<Layout>
				<h3> Nový kandidát</h3>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
						<Form.Field required>
							<label>Krstné meno</label>
							<Input 
								placeholder='Krstné meno kandidáta'
								value={this.state.name}
								onChange={event => this.setState({first_name: event.target.value})}
							/>
						</Form.Field>

						<Form.Field required>
							<label>Priezvisko</label>
							<Input 
								placeholder='Priezvisko kandidata'
								value={this.state.name}
								onChange={event => this.setState({last_name: event.target.value})}
							/>
						</Form.Field>

						<Form.Field>
							<label>Popis</label>

							<TextArea 
								autoHeight 
								placeholder='popis kandidata'
								value={this.state.description}
								onChange={event => this.setState({description: event.target.value})} />
						</Form.Field>
						<Message error header="Ojoj, niečo sa pokazilo!" content={this.state.errorMessage} />
						<Button color={constants.COLOR} loading={this.state.loading}>Vytvor kandidáta</Button>
					</Form>
			</Layout>
			);
	}
}

export default CandidateNew;