import {
  UPDATE_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE_LIST,
  CLEAR_QUESTIONNAIRE_LIST,
  UPDATE_QUESTIONNAIRE_USER_DETAILS_LIST,
  CLEAR_QUESTIONNAIRE_USER_DETAILS_LIST,
} from './actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_QUESTIONNAIRE:
      return { ...state, questionnaire: action.payload };
    case UPDATE_QUESTIONNAIRE_LIST:
      return { ...state, questionnaireList: action.payload };
    case CLEAR_QUESTIONNAIRE_LIST:
      return { ...state, questionnaireList: [] };
    case UPDATE_QUESTIONNAIRE_USER_DETAILS_LIST:
      return { ...state, questionnaireUserDetails: action.payload };
    case CLEAR_QUESTIONNAIRE_USER_DETAILS_LIST:
      return { ...state, questionnaireUserDetails: [] };
    default:
      return state;
  }
}
