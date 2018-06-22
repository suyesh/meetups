import React, { Component, Fragment } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  renderEvents = () => (
    this.props.events.map((event) => (
      <EventListItem event={event} key={event.id}/>
    ))
  )
  render(){
    return (
      <Fragment>
        <h1>Event List</h1>
        { this.renderEvents() }
      </Fragment>
    )
  }
}

export default EventList
