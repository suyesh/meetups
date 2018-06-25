import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import AppRoutes from './AppRoutes';
import ModalManager from '../../features/modals/ModalManager';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
        </Switch>

        <Switch>
          <Route path="/(.+)" component={AppRoutes}/>
        </Switch>

      </Fragment>
    );
  }
}

export default App;
