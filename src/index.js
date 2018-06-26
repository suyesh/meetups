import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import './index.css';
import App from './app/layout/App';
import { configureStore } from './app/store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './app/common/utils/ScrollToTop';
import { loadEvents } from './features/event/eventActions'

const store = configureStore()
store.dispatch(loadEvents())

const AppWithRoute = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <ReduxToastr
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
        />
        <App/>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
)

render(<AppWithRoute/>, document.getElementById('root'));
registerServiceWorker();
