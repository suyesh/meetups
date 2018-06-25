import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom';
import Logo from "../../../app/assets/images/logo.png"
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';
import { logout } from '../../auth/authActions'

const actions = {
  openModal,
  logout
}

const mapState = ({ auth }) => ({
  auth
})

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  authenticatedButtons = () => {
    if (this.props.auth.authenticated) {
      return (
        <Fragment>
          <Menu.Item as={NavLink} to='/people' name="People" />
          <Menu.Item>
            <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
          </Menu.Item>
          <SignedInMenu signOut={this.handleSignOut} currentUser={this.props.auth.currentUser}/>
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

export default withRouter(connect(mapState, actions)(NavBar));
