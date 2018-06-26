import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import firebase from '../config/firebase'


const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
}


export const configureStore = (preloadedState) => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore }), logger];
  const middlewareEnhancers = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancers];

  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  );

  return store
}
