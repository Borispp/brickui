import {
  UPDATE_USER,
  UPDATE_VERIFICATION_PENDING_EMAIL,
  UPDATE_VERIFICATION_STATUS,
  UPDATE_ROLE_STATUS,
} from './actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload };
    case UPDATE_VERIFICATION_PENDING_EMAIL:
      return { ...state, verificationPendingEmail: action.payload };
    case UPDATE_VERIFICATION_STATUS:
      return { ...state, verificationStatus: action.payload };
    case UPDATE_ROLE_STATUS:
      return { ...state, role: action.payload };
    default:
      return state;
  }
}
