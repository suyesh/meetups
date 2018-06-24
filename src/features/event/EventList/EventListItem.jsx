import React, { Component } from 'react'
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAtendee from './EventListAtendee'

class EventListItem extends Component {
  renderAtendees = () => (
    this.props.event.attendees && this.props.event.attendees.map((attendee) => (
      <EventListAtendee attendee={attendee} key={attendee.id}/>
    ))
  )

  render(){
    const { hostPhotoURL, title, hostedBy, date, venue, description } = this.props.event
    return(
      <Segment.Group>
       <Segment>
         <Item.Group>
           <Item>
             <Item.Image size="tiny" circular src={ hostPhotoURL } />
             <Item.Content>
               <Item.Header as="a">{ title }</Item.Header>
               <Item.Description>
                 Hosted by <a>{ hostedBy }</a>
               </Item.Description>
             </Item.Content>
           </Item>
         </Item.Group>
       </Segment>
       <Segment>
         <span>
           <Icon name="clock" /> { date } |
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
         <Button as="a" color="teal" floated="right" content="View" />
       </Segment>
     </Segment.Group>
    )
  }
}

export default EventListItem
