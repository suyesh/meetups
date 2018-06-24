import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import cuid from 'cuid'
import { createEvent, updateEvent } from '../eventActions';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  }
}

const actions = {
  createEvent,
  updateEvent
}

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  }

  onInputChange = (e) => {
    const newEvent = this.state.event
    newEvent[e.target.name] = e.target.value
    this.setState({
      event: { ...this.state.event, ...newEvent }
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event)
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/images/user.png'
      }
      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    }
  }

  render(){
    const { title, date, city, venue, hostedBy } = this.state.event
    return(
      <Segment>
         <Form onSubmit={this.onFormSubmit}>
           <Form.Field>
             <label>Event Title</label>
             <input value={title} name="title" onChange={this.onInputChange} placeholder="Event Title" />
           </Form.Field>
           <Form.Field>
             <label>Event Date</label>
             <input type="date" value={date} name="date" onChange={this.onInputChange} placeholder="Event Date" />
           </Form.Field>
           <Form.Field>
             <label>City</label>
             <input name="city" value={city} onChange={this.onInputChange} placeholder="City event is taking place" />
           </Form.Field>
           <Form.Field>
             <label>Venue</label>
             <input name="venue" value={venue} onChange={this.onInputChange} placeholder="Enter the Venue of the event" />
           </Form.Field>
           <Form.Field>
             <label>Hosted By</label>
             <input name="hostedBy" value={hostedBy} onChange={this.onInputChange} placeholder="Enter the name of person hosting" />
           </Form.Field>
           <Button positive type="submit">
             Submit
           </Button>
           <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
         </Form>
       </Segment>
    )
  }
}

export default connect(mapState, actions)(EventForm)
