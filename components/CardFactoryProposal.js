import React, {Component} from 'react'
import { Button, Card, Icon, Message, Popup, Grid } from 'semantic-ui-react'
import { Router } from '../routes';
import web3 from '../ethereum/web3'
import axios from 'axios'
const {constants} = require('../helper/constants').default;

class CardFactoryProposal extends Component{

    state = {
        isVisible: 0,
        account: null
    }

    async componentDidMount(){
        const isVisible = await axios.get(constants.ADDRESS + '/electionVisibility',
        { 
            params: {
                election_address:this.props.address['address']
            }
        });
        this.setState({isVisible: isVisible.data[0].is_visible})  

        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
    }


    publishResultsProposal = async (event) => {
        const accounts = await web3.eth.getAccounts()
        Router.pushRoute(`/elections/${this.props.address['address']}/crypto/submitResultProposal/${accounts[0]}`)
      };

      renderCard() {
        if(this.props.address['isCreated'] == 'finished_proposal_no_uploaded'){
            if(this.props.electionInfoEth['winnerId'] == 0){
                return <Button animated onClick={ () =>{
                        event.preventDefault();
                        this.publishResultsProposal()
                        }}>
                        <Button.Content visible>Nahraj vysledky navrhoveho kola</Button.Content>
                        <Button.Content hidden>
                            <Icon name='key' />
                        </Button.Content>
                    </Button> 
            } else{
                return <Message compact>Navrhove kolo bolo ukončené!</Message>
            }
        } else if(this.props.address['isCreated'] == 'created_proposal_with_keys'){
            return   <Message info>
                        <Message.Header>Návrhové kolo prebieha</Message.Header>
                        <p>Nemôžeš nič robiť</p>
                    </Message> 
        } else if(this.props.address['isCreated'] == 'created_no_keys'){      
                return <Button animated onClick={ () =>{
                        event.preventDefault();
                        Router.pushRoute(`/elections/${this.props.address['address']}/crypto/genKeys`)
                        }}>
                        <Button.Content visible>Vytvor kluce</Button.Content>
                        <Button.Content hidden>
                            <Icon name='key' />
                        </Button.Content>
                    </Button> 
        }
      };

    renderHideButton(){
        return  <Popup
        trigger={
          <Button icon='flask' content='Vymaz volby' />
        }
        content={<Button color='green' content='Potvrd vymazanie' onClick={ async () => { 
            event.preventDefault();
            const resp = await axios.put(constants.ADDRESS + '/hideElection',
            { 
                address: this.props.address['address'],
            });
            Router.pushRoute(`/elections/administration/authentication/`)

        }} />}
        on='click'
        position='top right'
      />
    }

    ren(){
        if(this.state.isVisible != 0){
            return  <Card.Group>
            <Card style={{width:'500px'}}>
            <Card.Content>
                <Card.Header>{this.props.electionInfoEth['name']}</Card.Header>
                <Card.Description>{this.props.address['address']}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                {this.renderCard()}
            </Card.Content>
            {this.renderHideButton()}
            </Card>
        </Card.Group>
        } else {
            return null
        }
    }


    render(){
        return(
            this.ren()
        );
    };
}

export default CardFactoryProposal;