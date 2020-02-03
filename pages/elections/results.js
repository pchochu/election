import React, { Component } from 'react';
import Layout from '../../components/Layout';
import {Message, Label, Icon, Header } from 'semantic-ui-react';
import Election from '../../ethereum/election'
import axios from 'axios';
const {constants} = require('../../helper/constants').default;
import {getJwtAdministration} from '../../helper/jwtAdministration'
import { Router } from '../../routes'


class ElectionResults extends React.Component {
    	static async getInitialProps(props){

            let electionDescription = 'Prázdny'
            let summary
            const election = Election(props.query.address);
		try{
            const results = await election.methods.election_result().call()
            var resultsOfElection = JSON.parse(results)
            
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

            summary = await election.methods.getSummary().call();
		} catch (e) {
            console.log(e)
        }
		return {
			name:summary[3], 
            description_of_election: electionDescription,
            results: resultsOfElection
		};
	}

    renderDetails(){
		let candidates
		if(this.props.proposalCandidates != ''){
			var myObject = JSON.parse(this.props.results)

			candidates = Object.keys(myObject).map(function(key, index) {
				return <tr key={key}>
				<td data-label="Name">{key}</td>
				<td data-label="NumOfVotes">{myObject[key]}</td>
				</tr>
			});
		}
		return candidates
	}

	renderResults() {
        var count = Object.keys(this.props.results).length;
	    if(count > 0){
		return  <table class="ui celled table">
			<thead>
			<tr>
				<th>Meno a priezvysko</th>
				<th>Pocet hlasov</th>
			</tr></thead>
			<tbody>
                {this.renderDetails()}
			</tbody>
		</table>
		} else{
			return <div class="ui compact message">
			<p>Vyzera to tak, ze neexistuju vysledky :(</p>
		</div>
		}
    }

	render() {
		return (
			<Layout>
                  <Header as='h1'>
                    <Icon name='birthday cake' />
                    <Header.Content>Výsledky volieb: {this.props.name}</Header.Content>
                </Header>
                {this.renderResults()}
			</Layout>
		);
	}
}

export default ElectionResults;