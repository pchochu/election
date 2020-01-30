import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import factory from '../../../ethereum/factory';
import Election from '../../../ethereum/election'
import CardFactory from '../../../components/CardFactory'
import CardFactoryProposal from '../../../components/CardFactoryProposal'
import {Button, Icon, Message } from "semantic-ui-react";
import { Router } from '../../../routes';
import axios from 'axios'
import {getJwtAdministration} from '../../../helper/jwtAdministration'
const {constants} = require('../../../helper/constants').default;


class FactoryAdministration extends Component{

    async componentDidMount(){
        const jwt = await getJwtAdministration()
        if(jwt){
            await axios.post(constants.ADDRESS +  '/authenticateFactory', 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': jwt
                },
            }).then( e => {
                
            }).catch(error => {
                console.log("Neulozeny token")
                Router.pushRoute(`/elections/administration/login/2`);
            })
        } else {
            Router.pushRoute(`/elections/administration/login/2`);
        }
	}
    
	static async getInitialProps(props){

		const elections = await factory.methods.getDeployedElections().call();
        const administratorAddress = props.query.adminAddress

		const administratedAddresses =  await Promise.all(elections.map(async (address) => {
            const election = Election(address)
            const isManager = await election.methods.manager().call()
			if(isManager == administratorAddress){
                return address
            }
        }));

        const addressesInfo = await Promise.all(administratedAddresses.map(async (address) => {
            const resp = await axios.get(constants.ADDRESS + '/getIsCreated',
            { 
                params: {
                    election_address:address
                }
            });

            let created
            if(resp.data.length == 1){
                created = resp.data[0]['is_created']
            } else{
                created = 'notStored'
            }
            return {isCreated: created, address: address}
        }))

        let electionInfo
        if(administratedAddresses[0] !== undefined){
            electionInfo =  await Promise.all(administratedAddresses.map(async (address) => {
                const election = Election(address)
                const winnerId = await election.methods.id_winner().call()
                const approvalsToStart = await election.methods.approvalsToStartCount().call()
                const summary = await election.methods.getSummary().call();
                const propRunning = await election.methods.proposalIsRunning().call();
                const propSet = await election.methods.proposalIsSet().call();
                return {proposalIsRunning: propRunning, proposalIsSet: propSet, name: summary[3], numOfAdmins: summary[4], numOfAdminStart: approvalsToStart, winnerId: winnerId}
            }));
        } else{
            electionInfo = null
        }
		return {addressesInfo, administratorAddress, electionInfo};
	}

     renderElections(){
         try{
            return this.props.addressesInfo.map((address, index) => {
                if((this.props.electionInfo[index]['proposalIsRunning'] == 0) && (address != undefined) && (address['isCreated'] == 'created_no_keys' || address['isCreated'] == 'finished_no_uploaded' || address['isCreated'] == 'created_with_keys')){
                    return <CardFactory
                        key={index}
                        id={index}
                        electionInfoEth={this.props.electionInfo[index]}
                        address={address}/>;
            } else if((this.props.electionInfo[index]['proposalIsRunning'] == 1) && (address != undefined) && (address['isCreated'] == 'created_no_keys' || address['isCreated'] == 'finished_proposal_no_uploaded' || address['isCreated'] == 'created_proposal_with_keys') ){
                return <CardFactoryProposal
                        key={index}
                        id={index}
                        electionInfoEth={this.props.electionInfo[index]}
                        address={address}/>;
            }})
        } catch(e){
            Router.pushRoute(`/elections/administration/login/2`);
        }
    }

	render(){
		return( 
			<Layout>
				<div>
                    <h2>Voľby, ktoré si založil z účtu {this.props.administratorAddress}</h2>

                    {this.renderElections()}
                    
                    <Button 
                        color={constants.COLOR}
                        animated
                        style={{marginTop:'25px'}} 
                        onClick={ () =>{
                            event.preventDefault();
                            Router.pushRoute(`/elections/new`) 
                        }}>
                    <Button.Content visible>Založ nové voľby</Button.Content>
                    <Button.Content hidden>
                        <Icon name='balance' />
                    </Button.Content>
                    </Button>
				</div>
			</Layout>
	)};
}

export default FactoryAdministration;