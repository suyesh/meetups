//*global google */

import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { withFirestore } from 'react-redux-firebase'
import Script from 'react-load-script';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { reduxForm, Field } from 'redux-form';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import { googleApiKey } from '../../../config'

const mapState = (state) => {
  let event = {}

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    initialValues: event,
    event
  }
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired(({ message: 'Please provide a category' })),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({ message: 'Description needs to be atleast 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
    .then(results => getLatLng(results[0]))
    .then(cityLatLng => {
      this.setState({
        cityLatLng
      })
    })
    .then(() => {
      this.props.change('city', selectedCity)
    })
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
    .then(results => getLatLng(results[0]))
    .then(venueLatLng => {
      this.setState({
        venueLatLng
      })
    })
    .then(() => {
      this.props.change('venue', selectedVenue)
    })
  }

  onFormSubmit = (values) => {
    values.venueLatLng = this.state.venueLatLng
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng
      }
      this.props.updateEvent(values)
      this.props.history.goBack();
    } else {
      this.props.createEvent(values)
      this.props.history.push('/events')
    }
  }

  handleScriptLoaded = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  componentDidMount = async () => {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`)
  }

  componentWillUnmount = () => {
    const { firestore, match } = this.props;
    firestore.unsetListener(`events/${match.params.id}`)
  }

  render(){
    const { invalid, submitting, pristine, event, cancelToggle } = this.props;

    return(
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content="Event Details"/>
             <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
               <Field name='title' type='text' component={TextInput} placeholder="Give your evnt a name"/>
               <Field
                 name='category'
                 type='text'
                 component={SelectInput}
                 options={category}
                 placeholder="What is your event about?"
                 multiple={false}
               />
               <Field
                 name='description'
                 type='text'
                 component={TextArea}
                 rows={3}
                 placeholder="Tell us about your event"
               />
               <Header sub color='teal' content="Event Location Details"/>
               <Field
                 name='city'
                 type='text'
                 component={PlaceInput}
                 placeholder="Event City"
                 options={{ types: ['(cities)']}}
                 onSelect={this.handleCitySelect}
               />
               { this.state.scriptLoaded &&
                 <Field
                   name='venue'
                   type='text'
                   component={PlaceInput}
                   placeholder="Event Venue"
                  options={{
                    location: new window.google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment']
                  }}
                  onSelect={this.handleVenueSelect}
                 />
               }
               <Field
                 name='date'
                 type='text'
                 component={DateInput}
                 dateFormat='YYYY-MM-DD HH:mm'
                 timeFormat='HH:mm'
                 showTimeSelect
                 placeholder="Date and Time of Event"
               />
               <Button disabled={invalid || submitting || pristine } positive type="submit">
                 Submit
               </Button>
               <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
               <Button
                 onClick={() => cancelToggle(!event.cancelled, event.id)}
                 type='button'
                 color={event.cancelled ? 'green' :  'red'}
                 floated='right'
                 content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
               />
             </Form>
           </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default withFirestore(connect(mapState, actions)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm)))
