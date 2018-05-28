import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import app from 'modules/app/reducer';
import user from 'modules/account/reducer';
import systemData from 'modules/systemData/reducer';
import companies from 'modules/companies/reducer';
import questionnaires from 'modules/questionnaires/reducer';
import interview from 'modules/interview/reducer';

const makeRootReducer = asyncReducers => (state, action) => {
  if (action.type === 'CLEAR_APP') {
    //  I’m not mutating the state here, I am merely reassigning the reference of a local variable called state
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return combineReducers({
    form,
    app,
    user,
    systemData,
    companies,
    questionnaires,
    interview,
    router,
    ...asyncReducers,
  })(state, action);
};

export const persistedReducers = [router];

export default makeRootReducer;
