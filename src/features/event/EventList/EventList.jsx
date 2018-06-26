import React, { Component, Fragment } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  renderEvents = () => (
    this.props.events && this.props.events.map((event) => (
      <EventListItem event={event} key={event.id} deleteEvent={this.props.deleteEvent}/>
    ))
  )
  render(){
    return (
      <Fragment>
        { this.renderEvents() }
      </Fragment>
    )
  }
}

export default EventList
