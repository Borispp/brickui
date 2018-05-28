import { ADD_ROLES } from './actions';

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_ROLES:
      return { ...state, roles: action.payload };
    default:
      return state;
  }
}
