import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import factory from '../../../ethereum/factory';
import Election from '../../../ethereum/election'
import CardAdmin from '../../../components/CardAdmin'
import CardAdminProposal from '../../../components/CardAdminProposal'
import axios from 'axios'
import {getJwtAdministration} from '../../../helper/jwtAdministration'
import {Router} from '../../../routes';

const {constants} = require('../../../helper/constants').default;


class Administration extends Component{
    state = {
        token : ''
    }

    async componentWillMount(){
        const jwt = await getJwtAdministration()
        if(jwt){
            await axios.post(constants.ADDRESS +  '/authenticateAdmin', 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': jwt
                },
            }).then( e => {
                this.setState({token:jwt})
            }).catch(error => {
                console.log("Neulozeny token")
                Router.pushRoute(`/elections/administration/login/1`);
            })
        } else {
            Router.pushRoute(`/elections/administration/login/1`);
        }
        this.setState({token:jwt})
	}
    
	static async getInitialProps(props){

		const elections = await factory.methods.getDeployedElections().call();
        const administratorAddress = props.query.adminAddress

		const administratedAddresses =  await Promise.all(elections.map(async (address) => {
            const election = Election(address)
            const isAdmin = await election.methods.administrators(props.query.adminAddress).call()
			if(isAdmin){
                return address
            }
        }));
        const addressesInfo = await Promise.all(administratedAddresses.map(async (address) => {
            
            const resp = await axios.get(constants.ADDRESS + '/getIsCreated',{ 
                params: {
                    election_address:address
                }
            });

            let created
            if(resp.data.length == 1 && (resp.data[0]['is_created'] == 'created_with_keys' || resp.data[0]['is_created'] == 'created_proposal_with_keys')){
                created = resp.data[0]['is_created']
            } else {
                created = 'notReady'
            }

            const numOfVotesNotStoredOnEth = await axios.get(constants.ADDRESS + '/getNumOfVotes',{ 
                params: {
                    election_address:address,
                    type: '0'
                }
            });

            const numOfVotesStoredOnEth = await axios.get(constants.ADDRESS + '/getNumOfVotes',{ 
                params: {
                    election_address:address,
                    type: '1'
                }
            });

            return {
                isCreated: created, 
                address: address, 
                numOfVotesNotStoredOnEth: numOfVotesNotStoredOnEth.data[0]['count'],
                numOfVotesStoredOnEth: numOfVotesStoredOnEth.data[0]['count'],
                numOfVotesTotal: parseInt(numOfVotesNotStoredOnEth.data[0]['count']) + parseInt(numOfVotesStoredOnEth.data[0]['count']),
            }
        }))

        let electionInfo
        if(administratedAddresses[0] !== undefined){
            electionInfo =  await Promise.all(administratedAddresses.map(async (address) => {
                const election = Election(address)
                const approvalsToStart = await election.methods.approvalsToStartCount().call()
                const approvalsToFinish = await election.methods.approvalsToFinishCount().call()
                const approvalsToStartProposal = await election.methods.approvalsToStartProposalCount().call()
                const approvalsToFinishProposal = await election.methods.approvalsToFinishProposalCount().call()
                const propRunning = await election.methods.proposalIsRunning().call();
                const propSet = await election.methods.proposalIsSet().call();
                const summary = await election.methods.getSummary().call();
                return {
                    proposalIsRunning: propRunning, 
                    proposalIsSet: propSet, 
                    name: summary[3], 
                    numOfAdmins: summary[4], 
                    numOfAdminStart: approvalsToStart, 
                    numOfAdminFinish: approvalsToFinish, 
                    numOfAdminStartProposal: approvalsToStartProposal, 
                    numOfAdminFinishProposal: approvalsToFinishProposal
                }
            }));
        } else{
            electionInfo = null
        }
            return {addressesInfo, administratorAddress, electionInfo};
	}

     renderElections(){
            if(this.props.electionInfo != null){
                return this.props.addressesInfo.map((address, index) => {

                    if(address != undefined && address['isCreated'] == 'created_with_keys'){
                        return <CardAdmin
                            key={index}
                            id={index}
                            electionInfoEth={this.props.electionInfo[index]}
                            address={address}
                            votesOnEth = {address['numOfVotesStoredOnEth']}
                            votesNotOnEth = {address['numOfVotesNotStoredOnEth']}
                            votesTotal = {address['numOfVotesTotal']}
                            jwt = {this.state.token}
                            />;
                } else if(address != undefined && address['isCreated'] == 'created_proposal_with_keys'){
                    return <CardAdminProposal
                            key={index}
                            id={index}
                            electionInfoEth={this.props.electionInfo[index]}
                            address={address}
                            jwt = {this.state.token}
                            />;
                }
            })
        }
	};

	render(){
		return( 
			<Layout>
				<div>
					<h2>Voľby, ktoré spravuješ z {this.props.administratorAddress}</h2>
					{this.renderElections()}
				</div>
			</Layout>
	)};
}

export default Administration;