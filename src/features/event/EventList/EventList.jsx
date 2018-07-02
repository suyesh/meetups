import React, { Component, Fragment } from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';

class EventList extends Component {
  renderEvents = () => (
    <Fragment>
      { this.props.events && this.props.events.length !== 0 &&
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.getNextEvents}
          hasMore={!this.props.loading && this.props.moreEvents}
          initialLoad={false}
          >
          {this.props.events && this.props.events.map((event) => (
            <EventListItem event={event} key={event.id}/>
          ))}
        </InfiniteScroll>
      }
    </Fragment>
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
