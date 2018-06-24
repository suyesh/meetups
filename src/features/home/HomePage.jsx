import React, { Fragment } from 'react';
import Logo from '../../app/assets/images/logo.png';

const HomePage = ({ history }) =>
<Fragment>
    <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
            <h1 className="ui inverted stackable header">
                <img className="ui image massive" src={ Logo } alt="logo"/>
                <div className="content">Meetups</div>
            </h1>
            <h2>Do whatever you want to do</h2>
            <div onClick={() => history.push('/events')} className="ui huge white inverted button">
                Get Started
                <i className="right arrow icon"/>
            </div>
        </div>
    </div>
</Fragment>

export default HomePage;
