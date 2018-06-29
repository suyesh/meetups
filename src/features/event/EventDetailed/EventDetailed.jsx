import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { toastr } from 'react-redux-toastr'
import {objectToArray } from '../../../app/common/utils/helpers'

const mapState = (state) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }
  return {
     event,
     auth: state.firebase.auth
   }
}

class EventDetailedPage extends Component {

  componentDidMount = async () => {
    const { firestore, match, history } = this.props;
    let event = await firestore.get(`events/${match.params.id}`)
    if (!event.exists) {
      history.push('/events');
      toastr.error('Sorry', 'Event Not found')
    }
  }

  render(){
    const { event, auth } = this.props
    const attendees = event && event.attendees && objectToArray(event.attendees)
    const isHost = event.hostUid === auth.uid
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)
    return(
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing}/>
          <EventDetailedInfo event={event}/>
          <EventDetailedChat/>
        </Grid.Column>

        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees}/>
        </Grid.Column>
      </Grid>
    )
  }
}



export default withFirestore(connect(mapState)(EventDetailedPage))
