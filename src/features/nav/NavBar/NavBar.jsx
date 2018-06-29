import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withFirebase  } from 'react-redux-firebase'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom';
import Logo from "../../../app/assets/images/logo.png"
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

const actions = {
  openModal
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout()
    this.props.history.push('/')
  }

  authenticatedButtons = () => {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      return (
        <Fragment>
          <Menu.Item as={NavLink} to='/people' name="People" />
          <Menu.Item>
            <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
          </Menu.Item>
          <SignedInMenu auth={this.props.auth} signOut={this.handleSignOut} profile={this.props.profile}/>
        </Fragment>
      )
    }
    return <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>
  }

  render(){
    return(
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to='/' header>
            <img src={Logo} alt="logo" />
            Meetups
          </Menu.Item>
          <Menu.Item as={NavLink} to='/events' name="Events" />
          { this.authenticatedButtons() }
        </Container>
      </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
