import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import makeRootReducer, { persistedReducers } from './reducers';

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, routerMiddleware(history)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  let composeEnhancers = compose;

  if (typeof window !== 'undefined') {
    enhancers.push(persistState(persistedReducers));

    /* eslint-disable no-underscore-dangle */
    if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
    /* eslint-enable no-underscore-dangle */
  }

  enhancers.push(applyMiddleware(...middleware));

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(makeRootReducer(), initialState, composeEnhancers(...enhancers));
  store.asyncReducers = {};

  if (!process.env.REACT_APP_OFFLINE_SSR) {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        // eslint-disable-next-line global-require
        const reducers = require('./reducers').default;

        store.replaceReducer(reducers(store.asyncReducers));
      });
    }
  }

  return store;
};
