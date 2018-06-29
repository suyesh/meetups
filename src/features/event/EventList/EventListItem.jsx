import React, { Component } from 'react'
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format'
import EventListAtendee from './EventListAtendee'
import { objectToArray } from '../../../app/common/utils/helpers';

class EventListItem extends Component {
  renderAtendees = () => (
    this.props.event.attendees && objectToArray(this.props.event.attendees).map((attendee) => (
      <EventListAtendee attendee={attendee} key={attendee.id}/>
    ))
  )

  render(){
    const { hostPhotoURL, title, hostedBy, venue, description } = this.props.event
    return(
      <Segment.Group>
       <Segment>
         <Item.Group>
           <Item>
             <Item.Image size="tiny" circular src={ hostPhotoURL } />
             <Item.Content>
               <Item.Header as={Link} to={`/event/${this.props.event.id}`}>{ title }</Item.Header>
               <Item.Description>
                 Hosted by <Link to={`/profile/${this.props.event.hostUid}`}>{ hostedBy }</Link>
               </Item.Description>
               { this.props.event.cancelled && <Label style={{ top: '-40px' }} ribbon='right' color='red' content="This event has been cancelled"/>}
             </Item.Content>
           </Item>
         </Item.Group>
       </Segment>
       <Segment>
         <span>
           <Icon name="clock" /> { format(this.props.event["date"].toDate(), 'dddd Do MMMM') }  at { format(this.props.event["date"].toDate(), 'HH:MM')}|
           <Icon name="marker" /> { venue }
         </span>
       </Segment>
       <Segment secondary>
         <List horizontal>
           { this.renderAtendees() }
         </List>
       </Segment>
       <Segment clearing>
         <span>{ description }</span>
         <Button as={Link} to={`/event/${this.props.event.id}`} color="teal" floated="right" content="View" />
       </Segment>
     </Segment.Group>
    )
  }
}

export default EventListItem
