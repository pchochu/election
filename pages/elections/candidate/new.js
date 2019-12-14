import React, {Component} from 'react'
import Layout from '../../../components/Layout'
import Election from '../../../ethereum/election'
import web3 from '../../../ethereum/web3'
import {Form, Button, Message, Input, TextArea} from 'semantic-ui-react'
import axios from 'axios';
import {getJwtAdministration} from '../../../helper/jwtAdministration'
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
		const jwt = getJwtAdministration()
		
		const election = Election(address);
		const candidateCount = await election.methods.getCandidateCount().call()

		const candidatesEthereum = await Promise.all(
			Array(parseInt(candidateCount))
				.fill()
				.map((element, index) => {
				return election.methods.candidates(index).call()
			})
		);

		const isProposal = await election.methods.proposalIsSet().call()

		var proposalJson
		if(isProposal){
			proposalJson = await election.methods.proposal_result().call()
		} else{
			proposalJson = ''
		}

		return {
			address:address, 
			ethCandidates:candidatesEthereum, 
			proposalCandidates: proposalJson,
			isProposal: isProposal,
			jwt:jwt
		};
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
			headers: {
				'Content-Type': 'application/json',
				'token': this.props.jwt
			},
			first_name: first_name,
			last_name: last_name,
			description: description,
			address: this.props.address,
			candidate_election_id: candidate_election_id
		}).catch(function (error) {
		console.log(error);
		});

			location.reload()
		}catch (e){
			this.setState({errorMessage: e.message});
		}

		this.setState({loading:false});
	};

	renderDetails(){
		let candidates = this.props.ethCandidates.map((candidate, index) => {
			return <tr key={candidate['last_name']}>
				<td data-label="Name">{candidate['first_name']}</td>
				<td data-label="Age">{candidate['last_name']}</td>
			</tr>
	   })
	   return candidates
	}


	renderDetailsProposal(){
		let candidates
		if(this.props.proposalCandidates != ''){
			var myObject = JSON.parse(this.props.proposalCandidates)

			candidates = Object.keys(myObject).map(function(key, index) {
				return <tr key={key}>
				<td data-label="Name">{key}</td>
				<td data-label="NumOfVotes">{myObject[key]}</td>
				</tr>
			});
		}
		return candidates
	}

	renderCandidates() {
		if(this.props.ethCandidates[0] != undefined){
			return  <table class="ui celled table">
				<thead>
				<tr>
					<th>Krstne meno</th>
					<th>Priezvisko</th>
				</tr></thead>
				<tbody>
					{this.renderDetails()}		  
				</tbody>
		</table>
		} else{
			return <div class="ui compact message">
			<p>V tychto volbach nie je zapisany este ziadny kandidat</p>
		  </div>
		}
}

renderProposalCandidates() {
	if(this.props.isProposal){
		return  <table class="ui celled table">
			<thead>
			<tr>
				<th>xlogin</th>
				<th>Pocet hlasov</th>
			</tr></thead>
			<tbody>
				{this.renderDetailsProposal()}		  
			</tbody>
		</table>
		} else{
			return <div class="ui compact message">
			<p>V tychto volbach neprebehlo navrhove kolo</p>
		</div>
		}
}

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
					<br></br>
					<h3>Kandidujuci kandidati</h3>
					{this.renderCandidates()}
					<h3>Kandidati z navrhoveho kola (nie su automaticky zapisani do volieb)</h3>
					{this.renderProposalCandidates()}

			</Layout>
			);
	}
}

export default CandidateNew;