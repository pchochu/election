import React, {Component} from 'react'
import { Card, Image, Modal, Button, Header, Popup, Dimmer, Icon } from 'semantic-ui-react'
const {constants} = require('../helper/constants').default;
import {Router} from '../routes'

class Candidate extends Component{

    onSubmit = async (event) => {
      event.preventDefault();
      Router.pushRoute(`/elections/candidate/${this.props.address}/${this.props.ethIndex}/castVote/`) 
    };

  render(){

    return(
      <div style={{marginBottom: '10px' }}>
        <Card>
          <Image src='' />
          <Card.Content>
          <Card.Meta>
              <span>Meno a priezvisko</span>
            </Card.Meta>
            <Card.Header>{this.props.candidate.first_name} {this.props.candidate.last_name}</Card.Header>
            <Card.Meta>
              <span></span>
            </Card.Meta>
            <Card.Description></Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Modal trigger={<Button>O kandidátovi</Button>} closeIcon>
            <Modal.Header>{this.props.candidate.first_name} {this.props.candidate.last_name}</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Header></Header>
                  <p>{this.props.candidate.description}</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <Button color={constants.COLOR} content="Zvol" onClick={this.onSubmit} />
          </Card.Content>
        </Card>
      </div>
  )};
}

export default Candidate;

