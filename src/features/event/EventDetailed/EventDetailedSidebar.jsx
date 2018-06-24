import React, { Fragment } from 'react';
import { Segment, List, Label, Item } from 'semantic-ui-react'

const EventDetailedSidebar = ({ attendees }) => {
  const isHost = false;
  return(
    <Fragment>
       <Segment
         textAlign="center"
         style={{ border: 'none' }}
         attached="top"
         secondary
         inverted
         color="teal"
       >
        { attendees && attendees.length } { attendees && attendees.length === 1 ? 'Person' : 'People'} Going
       </Segment>
       <Segment attached>
         <List relaxed divided>
           { attendees && attendees.map((attendee) => (
             <Item style={{ position: 'relative' }} key={attendee.id}>
               { isHost &&
                 <Label
                   style={{ position: 'absolute' }}
                   color="orange"
                   ribbon="right"
                 >
                   Host
                 </Label>
               }
               <Item.Image size="tiny" src={attendee.photoURL } />
               <Item.Content verticalAlign="middle">
                 <Item.Header as="h3">
                   <a>{ attendee.name }</a>
                 </Item.Header>
               </Item.Content>
             </Item>
           ))}
         </List>
       </Segment>
     </Fragment>
  )
}

export default EventDetailedSidebar;
