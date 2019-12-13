import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Message, Dropdown } from 'semantic-ui-react';
import factory from '../../../ethereum/factory';
import Election from '../../../ethereum/election'
import { Router } from '../../../routes';
import _ from 'lodash'
const {constants} = require('../../../helper/constants').default;

class ControlVote extends Component {

    state = {
        value: '',
        errorMessage: '',
    };

    static async getInitialProps() {

        const elections = await factory.methods.getDeployedElections().call();
        let electionSelect
        if(elections[0] != undefined){

            const endedElections = await Promise.all(elections.map(async (address) => {
                const election = Election(address)
                const winnerId = await election.methods.id_winner().call()
                let closedElection
                if(winnerId != 0){
                    closedElection = address
                }
                return closedElection
            }))
            
            const electionInfo = await Promise.all(endedElections.filter((el) => {
                if(el != undefined){
                    return true
                } else { 
                    return false
                }}).map(async (address) => {
                    const election = Election(address)
                    const summary = await election.methods.getSummary().call();
                    return {name:summary[3], address:address}
            }));
            
            electionSelect = _.map(electionInfo, election => ({
                key: election['address'],
                text: '' + election['name'] + '      ------->    ' + election['address'],
                value: election['address'],
            }))
        } else{
            electionSelect = null
        }
        
		return { electionSelect };
    }

    onSubmit = async (event) => {
        
        if(this.state.value == ''){
            this.setState({errorMessage: 'Nevybral si si žiadne volby'})
        } else{
            Router.pushRoute(`/elections/${this.state.value}/crypto/controlVoteAtAddress`) 
        }
    }

	render() {
		return (
			<Layout>
                <h2>Kontrola hlasu</h2>
                <div>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                        <Dropdown
                            placeholder='Vyber voľby'
                            onChange={this.handleSelectChange}
                            fluid
                            selection
                            value={this.state.value}
                            options={this.props.electionSelect}
                            onChange={(e, { value }) => this.setState({ value })}
                        />   
                        <Message style={{ marginTop: '0.8rem' }} error header="Ojoj, niečo sa pokazilo!" content={this.state.errorMessage} />
                        <Button style={{ marginTop: '0.8rem' }} color={constants.COLOR}>Ďalej</Button>
                    </Form>
                </div>
			</Layout>
		);
	}
}

export default ControlVote;