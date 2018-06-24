import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
}

class EventForm extends Component {
  state = {
    event: emptyEvent
  }

  componentDidMount = () => {
    if (this.props.selectedEvent !== null) {
      this.setState({
        event: this.props.selectedEvent
      })
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
   if (nextProps.selectedEvent !== this.props.selectedEvent) {
     this.setState({
       event: nextProps.selectedEvent || emptyEvent
     })
   }
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
    } else {
      this.props.createEvent(this.state.event)
    }
  }

  render(){
    const { cancel } = this.props
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
           <Button type="button" onClick={() => cancel()}>Cancel</Button>
         </Form>
       </Segment>
    )
  }
}

export default EventForm
