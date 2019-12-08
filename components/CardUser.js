import React, {Component} from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import {Router} from '../routes'

class CardUser extends Component{
      
    render(){
        return(
            <Card.Group>
                <Card style={{width:'500px'}}>
                <Card.Content>
                    <Card.Header>{this.props.name}</Card.Header>
                    <Card.Description>{this.props.address}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button animated onClick={ () =>{
                            event.preventDefault();
                            Router.pushRoute(`/elections/${this.props.address}`) 
                        }}>
                    <Button.Content visible>K voľbám!</Button.Content>
                    <Button.Content hidden>
                        <Icon name='road' />
                    </Button.Content>
                    </Button>
                </Card.Content>
                </Card>
            </Card.Group>
        );
    };
}

export default CardUser;