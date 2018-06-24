import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

export const configureStore = (preloadedState) => {
  const middlewares = [];
  const middlewareEnhancers = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancers];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  );

  return store
}
