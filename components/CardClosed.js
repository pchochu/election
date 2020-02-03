import React, {Component} from 'react'
import { Button, Card, Icon, Message } from 'semantic-ui-react'
import {Router} from '../routes'

class CardFinished extends Component{
      
    render(){
        return(
            <Card.Group>
                <Card style={{width:'500px'}}>
                <Card.Content>
                    <Card.Header>Uzavreté voľby s názvom: {this.props.name}</Card.Header>
                    <Card.Description>{this.props.address}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Message info>
                    <Message.Header>Víťaz volieb</Message.Header>
                    <Message.List>
                        <Message.Item>Víťazom volieb je kandidát: {this.props.winner['last_name']}</Message.Item>
                        <Message.Item>Počet hlasov: {this.props.winner['numOfVotesWinner']}</Message.Item>
                    </Message.List>
                </Message>  
                </Card.Content>
                <Card.Content extra>
                    <Button animated onClick={ () =>{
                            event.preventDefault();
                            Router.pushRoute(`/elections/${this.props.address}/showResults/`) 
                        }}>
                    <Button.Content visible>Kompletné výsledky</Button.Content>
                    <Button.Content hidden>
                        <Icon name='birthday cake' />
                    </Button.Content>
                    </Button>
                </Card.Content>
                </Card>
            </Card.Group>
        );
    };
}

export default CardFinished;