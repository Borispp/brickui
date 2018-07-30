import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import app from 'modules/app/reducer';
import systemData from 'modules/systemData/reducer';

const makeRootReducer = asyncReducers => (state, action) => {
  if (action.type === 'CLEAR_APP') {
    //  I’m not mutating the state here, I am merely reassigning the reference of a local variable called state
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return combineReducers({
    form,
    app,
    systemData,
    router,
    ...asyncReducers,
  })(state, action);
};

export const persistedReducers = [router];

export default makeRootReducer;
