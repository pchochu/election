import React, {Component} from 'react'
import Layout from '../../components/Layout'
import Election from '../../ethereum/election'
import RibbonDescription from '../../components/RibbonDescription'
import RibbonDetails from '../../components/RibbonDetails'
import Candidate from '../../components/Candidate'
import axios from 'axios'
const {constants} = require('../../helper/constants').default;

class ElectionShow extends Component{

	static async getInitialProps(props){
		const election = Election(props.query.address);

		let candidatesDB = []
		let electionDescription = 'Prázdny'
		let summary
		let candidatesEthereum

		try{
			const responseCandidates = await axios.get(constants.ADDRESS + '/candidates',
			{ 
				params: {
					election_address:props.query.address
				}
			});

			candidatesDB = responseCandidates.data

			const responseDescription = await axios.get(constants.ADDRESS + '/electionDescription',
			{ 
				params: {
					election_address:props.query.address
				}
			});

			electionDescription = responseDescription.data

			if(electionDescription[0].description === ''){
				electionDescription[0].description = 'Popis nebol definovaný'
			}
			const candidateCount = await election.methods.getCandidateCount().call()
			{/* ----NACITANIE ARRAYU Z ETH KONTRAKTU----*/}
				candidatesEthereum = await Promise.all(
				Array(parseInt(candidateCount))
					.fill()
					.map((element, index) => {
					return election.methods.candidates(index).call()
				})
			);

			summary = await election.methods.getSummary().call();
		} catch (error) {
			console.log(error)
		}
		return {
			address: props.query.address,
			manager:summary[0],
			candidatesCount:summary[1],
			id_election: summary[2],
			name_of_election: summary[3],
			candidates: candidatesDB,
			description_of_election: electionDescription,
			candidatesEthereum: candidatesEthereum
		};
	}

	renderCandidate(){
		return this.props.candidates.map((candidate, index) => {
			return <Candidate 
				key={index}
				id={index}
				candidate={candidate}
				address={this.props.address}
				ethIndex={this.props.candidatesEthereum[index][0]}
				ethCandidates={this.props.candidatesEthereum}/>;
		})
	};

	render(){
		return(
			<Layout>
					<RibbonDetails 
						manager={this.props.address} 
						simpleDescription={this.props.name_of_election}
						candidatesCount={this.props.candidatesCount}/>
					<RibbonDescription 
						description={String(this.props.description_of_election[0].description)}/>

				<h3>Kandidáti</h3>
				<br></br>
				{this.renderCandidate()}	
			</Layout>
			)
	}
}

export default ElectionShow;