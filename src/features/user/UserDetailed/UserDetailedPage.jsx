import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import differenceInYears from 'date-fns/difference_in_years'
import format from 'date-fns/format'
import User from '../../../app/assets/images/user.png'
import { Link } from 'react-router-dom'


const query = ({auth}) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos'}],
      storeAs: 'photos'
    }
  ]
}

const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
})

class UserDetailedPage extends Component {
    render() {
      const { profile } = this.props
      let age;
       if (profile.dateOfBirth) {
         age = differenceInYears(Date.now(), profile.dateOfBirth.toDate())
       } else {
         age = 'Unknown age'
       }
       let createdAt;
       if (profile.createdAt) {
         createdAt = format(profile.createdAt.toDate(), 'D MMM YYYY')
       }
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={ profile.photoURL || User }/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{ profile.displayName }</Header>
                                    <br/>
                                    <Header as='h3'>{ profile.occupation || 'unknown occupation' }</Header>
                                    <br/>
                                    <Header as='h3'>{age}, Lives in { profile.city || 'unknown city' }</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='About Display Name'/>
                                <p>I am a: <strong>{ profile.occupation  || 'tbn' }</strong></p>
                                <p>Originally from <strong>{ profile.origin || 'tbn' }</strong></p>
                                <p>Member Since: <strong>{ createdAt }</strong></p>
                                <p>{ profile.about }</p>

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='Interests'/>
                                { profile.interests ?
                                  <List>
                                    {
                                      profile.interests && profile.interests.map((interest, index) => (
                                        <Item key={index}>
                                            <Icon name='heart'/>
                                            <Item.Content>{ interest }</Item.Content>
                                        </Item>
                                      ))
                                    }
                                  </List> : <p>No interests</p>
                                }
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='image' content='Photos'/>

                        <Image.Group size='small'>
                          { this.props.photos && this.props.photos.length > 0 && this.props.photos.map(photo => <Image src={photo.url}/>)}
                        </Image.Group>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='calendar' content='Events'/>
                        <Menu secondary pointing>
                            <Menu.Item name='All Events' active/>
                            <Menu.Item name='Past Events'/>
                            <Menu.Item name='Future Events'/>
                            <Menu.Item name='Events Hosted'/>
                        </Menu>

                        <Card.Group itemsPerRow={5}>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default compose(
  connect(mapState),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage)
