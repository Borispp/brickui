import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import createBrowserHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import { createStore, setStore } from './store';
import { overrideDefaultValidationRuleMessages } from './utils/validationHelpers';

import initRoutes from './routes';

import './styles/core.scss';

// ========================================================
// Browser History Setup
// ========================================================
const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASENAME,
});

/* eslint-disable no-underscore-dangle */
const initialState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */

const store = createStore(initialState, history);

setStore(store);

// TODO: Use ReactDOM.hydrate for ssr (?)

initRoutes(store).then(routes => {
  overrideDefaultValidationRuleMessages();

  /* eslint-disable comma-dangle */
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
  /* eslint-enable */
});

registerServiceWorker();
