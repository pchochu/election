import React, {Component} from 'react'
import { Button, Card, Icon, Message } from 'semantic-ui-react'
import { Router } from '../routes';
import web3 from '../ethereum/web3'

class CardFactoryProposal extends Component{

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
                return <Message compact>Voľby boli ukončené!</Message>
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


    render(){
        return(
            <Card.Group>
                <Card style={{width:'500px'}}>
                <Card.Content>
                    <Card.Header>{this.props.electionInfoEth['name']}</Card.Header>
                    <Card.Description>{this.props.address['address']}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {this.renderCard()}
                </Card.Content>
                </Card>
            </Card.Group>
        );
    };
}

export default CardFactoryProposal;