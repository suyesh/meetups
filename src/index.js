import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App';
import { configureStore } from './app/store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const AppWithRoute = () => (
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

render(<AppWithRoute/>, document.getElementById('root'));
registerServiceWorker();
