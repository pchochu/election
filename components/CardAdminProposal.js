import React, {Component} from 'react'
import { Button, Card, Icon, Message, Dimmer, Segment, Header } from 'semantic-ui-react'
import {Router} from '../routes'
import axios from 'axios'
import Election from '../ethereum/election'
import web3 from '../ethereum/web3'
const {constants} = require('../helper/constants').default;

class CardAdminProposal extends Component{
    state = {
        loading: false,
        dimmedMsg: ''
    }

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })
    
	loadVotes = async (event) => {
        this.setState({ loading: true});
        let accounts
        try {
            let response = await axios.get( constants.ADDRESS + '/createMerkleRootProposal', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': this.props.jwt
                },
                params: {
                    address:this.props.address['address']
                }
            }).then(res => {return res})
            accounts = await web3.eth.getAccounts();
            if(response.data['numberOfVotes'] > 0){
                const election = Election(this.props.address['address']);
                await election.methods.addHashOfVotes("0x"+response.data['root']).send({
                        from: accounts[0]
                    })

                await axios.put(constants.ADDRESS + '/updatePendingVotesToStoredProposal', {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': this.props.jwt
                    },
                    address: this.props.address['address'],
                    root: response.data['root']
                })    
            }
        } catch (e) {
            console.log(e.message);
        }
        this.setState({ loading: false });
        Router.pushRoute(`/elections/${accounts[0]}/administrationElections/`)
    }

    startProposal = async (event) => {
        this.setState({ loading: true});
        const accounts = await web3.eth.getAccounts();
        try {    
                const election = Election(this.props.address['address']);
                const alreadyStarted = await election.methods.approversToStartProposal(accounts[0]).call();
                if(!alreadyStarted){
                    await election.methods.createApprovalToStartProposal(accounts[0]).send({
                            from: accounts[0]
                        })
                    this.setState({dimmedMsg: 'Výborne, spustil si navrhove kolo'})
                    {this.handleShow()}   
                    Router.pushRoute(`/elections/${accounts[0]}/administrationElections/`)  
                } else{
                    this.setState({dimmedMsg: 'Už si spustil voľby, čaká sa na ostatných administrátorov'})
                    {this.handleShow()}
                }
        } catch (e) {
            console.log(e.message);
        }
        this.setState({ loading: false });
    }

    proposalFinished = async (event) => { 
        try{	
            axios.put(constants.ADDRESS + '/setProposalAsFinished', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': this.props.jwt
                },
                address: this.props.address['address'],
            });
        } catch (e) {
            throw e.message
        }			
    }
    finishProposal = async (event) => {
        this.setState({ loading: true});
        let accounts
        try {      
                this.loadVotes()  
                const election = Election(this.props.address['address']);
                accounts = await web3.eth.getAccounts();
                const approversToFinish = await election.methods.apporversToFinishProposal(accounts[0]).call();
                if(!approversToFinish){
                    await election.methods.createApprovalToFinishProposal(accounts[0]).send({
                            from: accounts[0]
                        })
                    this.setState({dimmedMsg: 'Výborne, ukončil si navrhove kolo'})
                    {this.handleShow()}  
                    Router.pushRoute(`/elections/${accounts[0]}/administrationElections/`) 
                } else{
                    this.setState({dimmedMsg: 'Už si ukončil voľby, čaká sa na ostatných administrátorov'})
                    {this.handleShow()}
                }
        } catch (e) {
            console.log(e.message);
        }
        
        const finish = parseInt(this.props.electionInfoEth['numOfAdminFinish']) + 1

        if(this.props.electionInfoEth['numOfAdmins'] == finish.toString()){
            this.proposalFinished()
            Router.pushRoute(`/elections/${accounts[0]}/administrationElections/`)  
        }
        this.setState({ loading: false});
    }
    

    proposalStarted() {
        return <div>
            <Button loading={this.state.loading} animated onClick={ () =>{this.finishProposal()}}>
                <Button.Content visible>Ukonci navrhove kolo</Button.Content>
                <Button.Content hidden>
                    <Icon name='close'/>
                </Button.Content>
            </Button>
        </div>
    }

    startProposalButton() {
        return <Button loading={this.state.loading} animated onClick={ () =>{this.startProposal()}}>
                <Button.Content visible>Spustit navrhove kolo</Button.Content>
                <Button.Content hidden>
                    <Icon name='play' />
                </Button.Content>
                </Button>
    }

    showButtons() {
        if(this.props.electionInfoEth['numOfAdmins'] > this.props.electionInfoEth['numOfAdminStartProposal']){
            return this.startProposalButton()
        } else if (this.props.electionInfoEth['numOfAdmins'] == this.props.electionInfoEth['numOfAdminStartProposal']){
            return this.proposalStarted()
        }
    }

    showVotes(){
        return <Message>
            <Message.Header>Lorem Ipsum</Message.Header>
            <Message.List>
            <Message.Item>Lorem ipsum</Message.Item>
            </Message.List>
      </Message>
    }
    render(){
        const { active } = this.state

        return(
            <div>
                    <Card.Group>
                        <Card style={{width:'500px'}}>
                        <Card.Content>
                            <Card.Header>{this.props.electionInfoEth['name']}</Card.Header>
                            <Card.Description>{this.props.address['address']}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            {this.showButtons()}
                            <Dimmer.Dimmable as={Segment} dimmed={active}>
                                {this.showVotes()}
                                <Dimmer active={active} onClickOutside={this.handleHide}>
                                    <Header as='h2' icon inverted>
                                     {this.state.dimmedMsg}
                                    </Header>
                                </Dimmer>
                            </Dimmer.Dimmable>
                        </Card.Content>
                        </Card>
                    </Card.Group>
            </div>
        );
    };
}

export default CardAdminProposal;