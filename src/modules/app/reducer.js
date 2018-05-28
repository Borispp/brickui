import { SET_NOTIFICATION } from './actions';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
}
