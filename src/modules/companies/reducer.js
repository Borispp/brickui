import { UPDATE_COMPANIES_LIST, UPDATE_COMPANY_USER_LIST, UPDATE_COMPANY_PARTICIPANTS } from './actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_COMPANIES_LIST:
      return { ...state, companiesList: action.payload };
    case UPDATE_COMPANY_PARTICIPANTS:
      return { ...state, companyParticipants: action.payload };
    case UPDATE_COMPANY_USER_LIST:
      return { ...state, userList: { [action.payload.companyId]: action.payload.userList } };
    default:
      return state;
  }
}
