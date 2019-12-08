import React from 'react'
import { Grid, Image, Label, Segment } from 'semantic-ui-react'
const {constants} = require('../helper/constants').default;

export default (props) => {
  return(
    <Grid columns={4}>
        <Grid.Column>
          <Segment raised compact>
            <Label color={constants.COLOR}ribbon size='medium' basic='1'>
              Názov
            </Label>
            <span>{props.simpleDescription}</span>
          </Segment>

          <Segment raised compact>
            <Label color={constants.COLOR} ribbon size='medium' basic='1'>
              Adresa volieb
            </Label>
            <span>{props.manager}</span>
          </Segment>

        </Grid.Column>
          <Segment raised compact>
              <Label color={constants.COLOR} ribbon size='medium' basic='1'>
                Počet kandidátov
              </Label>
              <span>{props.candidatesCount}</span>
          </Segment>
        <Grid.Column>

        </Grid.Column>
      </Grid>
    );
};

