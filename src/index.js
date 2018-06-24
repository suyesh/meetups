import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';

const AppWithRoute = () => (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)

render(<AppWithRoute/>, document.getElementById('root'));
registerServiceWorker();
