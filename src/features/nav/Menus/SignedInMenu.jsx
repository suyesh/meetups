import React from 'react';
import {Menu, Dropdown, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import User from '../../../app/assets/images/user.png'

const SignedInMenu = ({ signOut }) =>
  <Menu.Item position="right">
    <Image avatar spaced="right" src={ User }/>
    <Dropdown pointing="top left" text="Username">
        <Dropdown.Menu>
            <Dropdown.Item text="Create Event" icon="plus"/>
            <Dropdown.Item text="My Events" icon="calendar"/>
            <Dropdown.Item text="My Network" icon="users"/>
            <Dropdown.Item text="My Profile" icon="user"/>
            <Dropdown.Item as={Link} to="/settings" text="Settings" icon="settings"/>
            <Dropdown.Item text="Sign Out" icon="power" onClick={signOut}/>
        </Dropdown.Menu>
    </Dropdown>
</Menu.Item>

export default SignedInMenu
