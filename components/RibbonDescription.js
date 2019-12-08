import React from 'react'
import { Grid, Image, Label, Segment } from 'semantic-ui-react'
const {constants} = require('../helper/constants').default;

export default (props) => {
  return(
    <Grid columns={1}>
        <Grid.Column>
          <Segment raised>
            <Label color={constants.COLOR} ribbon size='medium' basic='true'>
              Popis
            </Label>
            <span>{props.description}</span>
          </Segment>
        </Grid.Column>
      </Grid>
    );
};

