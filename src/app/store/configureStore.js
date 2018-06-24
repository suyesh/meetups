import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';

export const configureStore = (preloadedState) => {
  const middlewares = [];
  const middlewareEnhancers = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancers];

  const composedEnhancer = compose(...storeEnhancers);

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  );

  return store
}
