import React, { Component } from 'react';
import factory from '../ethereum/factory';
import Election from '../ethereum/election'
import CardUser from '../components/CardUser'
import CardUserProposal from '../components/CardUserProposal'
import CardClosed from '../components/CardClosed'
import Layout from '../components/Layout';
import { Message } from 'semantic-ui-react'
const {constants} = require('../helper/constants').default;
import axios from 'axios'

class ElectionIndex extends Component {
	
	static async getInitialProps() {

		const elections = await factory.methods.getDeployedElections().call();
		const electionInfo = await Promise.all(elections.map(async (address) => {
			const v = await axios.get(constants.ADDRESS + '/electionVisibility',
			{ 
				params: {
					election_address:address
				}
			});

			const isV = v.data[0].is_visible

			const election = Election(address)
			const approvalsToStart = await election.methods.approvalsToStartCount().call()
			const approvalsToFinish = await election.methods.approvalsToFinishCount().call()
			const approvalsToStartProposal = await election.methods.approvalsToStartProposalCount().call()
			const approvalsToFinishProposal = await election.methods.approvalsToFinishProposalCount().call()
			const propRunning = await election.methods.proposalIsRunning().call();
			const propSet = await election.methods.proposalIsSet().call();
			const numOfAdmins = await election.methods.administratorsCount().call()
			const winnerId = await election.methods.id_winner().call()
			let winner = {}
			if(winnerId > 0){
				const winnerEth = await election.methods.candidates(winnerId - 1).call()
				const numOfVotesWinner = await election.methods.winner_num_of_votes().call()
				winner = {
					first_name: winnerEth['first_name'],
					last_name: winnerEth['last_name'],
					numOfVotesWinner: numOfVotesWinner
				}
			}
			
			const summary = await election.methods.getSummary().call();
			return {
				isVisible: isV,
				name:summary[3], 
				numStart:approvalsToStart, 
				numAdmin:numOfAdmins, 
				numFinish:approvalsToFinish,
				winner: winner,
				winnerId: winnerId,
				numOfAdminStartProposal: approvalsToStartProposal, 
				numOfAdminFinishProposal: approvalsToFinishProposal,
				proposalIsRunning: propRunning, 
				proposalIsSet: propSet
			}
		}));

		return { elections, electionInfo };
	}

	renderFinishedEelections(){
		let elections = this.props.elections.map((address, index) => {
			if(address != undefined && this.props.electionInfo[index]['winnerId'] > 0 && (this.props.electionInfo[index]['isVisible']) != 0){
				return <CardClosed 
					key={index}
					id={index}
					name={this.props.electionInfo[index]['name']}
					address={address}
					winner={this.props.electionInfo[index]['winner']}/>;
			}})

			var nothingToShow = true
			for (var i = 0; i < elections.length; i++) { 
				if((typeof elections[i] !== 'undefined') &&  (this.props.electionInfo[i]['isVisible'] != 0)){
					nothingToShow = false
				}
			}
			if(nothingToShow) {
				return <Message
						style={{width:'500px'}}
						icon='coffee'
						header='Žiadne voľby ešte neboli ukončené'
					/>
			} else{
				return elections
			}
	}
	renderElections() {
			var anythingToShow = false
			let elections = this.props.elections.map(async (address, index) => {
				 if (address != undefined && 
					this.props.electionInfo[index]['winnerId'] == 0 &&
					(this.props.electionInfo[index]['numStart'] == this.props.electionInfo[index]['numAdmin']) &&
					(this.props.electionInfo[index]['numStart'] != this.props.electionInfo[index]['numFinish']) &&
					(this.props.electionInfo[index]['isVisible']) != 0) {
					
					const v = await axios.get(constants.ADDRESS + '/electionVisibility',
					{ 
						params: {
							election_address:address
						}
					});
		
					const isV = v.data[0].is_visible

					if(isV == 1){
					anythingToShow = true

					return <CardUser
						key={index}
						id={index}
						name={this.props.electionInfo[index]['name']}
						address={address} />;
					} 
				}
			})

			// var nothingToShow = true
			// for (var i = 0; i < elections.length; i++) { 
			// 	if((typeof elections[i] !== 'undefined') &&  (this.props.electionInfo[i]['isVisible'] != 0)){
			// 		nothingToShow = false
			// 	}
			// }

			if(!anythingToShow) {
				return <Message
						style={{width:'500px'}}
						icon='coffee'
						header='Žiadne voľby nie sú k dispozícii'
					/>
			} else{
				return elections
			}
	}

	renderProposal() {
		let elections = this.props.elections.map((address, index) => {
			 if (address != undefined && 
				this.props.electionInfo[index]['proposalIsRunning'] == 1 &&
				(this.props.electionInfo[index]['numOfAdminStartProposal'] == this.props.electionInfo[index]['numAdmin']) &&
				(this.props.electionInfo[index]['numOfAdminStartProposal'] != this.props.electionInfo[index]['numOfAdminFinishProposal'])&&
				(this.props.electionInfo[index]['isVisible']) != 0) {
				return <CardUserProposal
					key={index}
					id={index}
					name={this.props.electionInfo[index]['name']}
					address={address} />;
			} 
		})

		var nothingToShow = true
		for (var i = 0; i < elections.length; i++) { 
			if((typeof elections[i] !== 'undefined') && (this.props.electionInfo[i]['isVisible'] != 0)){
				nothingToShow = false
			}
		}

		if(nothingToShow) {
			return <Message
					style={{width:'500px'}}
					icon='coffee'
					header='Žiadne voľby nie sú k dispozícii'
				/>
		} else{
			return elections
		}
}

	render() {
		return (
			<Layout>
				<div>
					<h2>Prebiehajúce voľby</h2>
					{this.renderElections()}
					<h2>Návrhové kolo</h2>
					{this.renderProposal()}
					<h2>Ukončené voľby</h2>
					{this.renderFinishedEelections()}
				</div>
			</Layout>
		)
	};
}

export default ElectionIndex;