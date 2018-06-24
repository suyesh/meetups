import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailed';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';


const AppRoutes = () => (
  <Fragment>
    <NavBar/>
    <Container className="main">
      <Switch>
        <Route path='/events' component={EventDashboard}/>
        <Route path='/events/:id' component={EventDetailedPage}/>
        <Route path='/people' component={PeopleDashboard}/>
        <Route path='/profile/:id' component={UserDetailedPage}/>
        <Route path='/settings' component={SettingsDashboard}/>
        <Route path='/createEvent' component={EventForm}/>
      </Switch>
    </Container>
  </Fragment>
)

export default AppRoutes;
