import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import { getEventsForDashboard } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity'
import { firestoreConnect , isLoaded, isEmpty } from 'react-redux-firebase'

const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const actions = {
  getEventsForDashboard
}

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  }

  componentDidMount = async () => {
    let next = await this.props.getEventsForDashboard()
    console.log(next)

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      })
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1]
    console.log(lastEvent)
    let next = await this.props.getEventsForDashboard(lastEvent)
    console.log(next)
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      })
    }
  }

  UNSAFE_componentWillReceiveProps =(nextProps) => {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      })
    }
  }

  render(){
    const { loading} = this.props
    const { moreEvents, loadedEvents } = this.state
    if (this.state.loadingInitial) return <LoadingComponent inverted={true}/>
    return(
      <Grid stackable>
          <Grid.Column width={10}>
              <EventList
                loading={loading}
                moreEvents={moreEvents}
                events={loadedEvents}
                getNextEvents={this.getNextEvents}
              />
          </Grid.Column>
          <Grid.Column width={6}>
             <EventActivity/>
          </Grid.Column>
          <Grid.Column width={10}>
              <Loader active={loading}/>
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard))
