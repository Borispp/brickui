import { UPDATE_INTERVIEW_USER_LIST, UPDATE_INTERVIEW, UPDATE_INTERVIEW_QUESTIONNAIRE } from './actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_INTERVIEW_USER_LIST:
      return { ...state, userList: { [action.payload.questionnaireId]: action.payload.userList } };
    case UPDATE_INTERVIEW:
      return { ...state, interview: action.payload };
    case UPDATE_INTERVIEW_QUESTIONNAIRE:
      return { ...state, questionnaire: action.payload };
    default:
      return state;
  }
}
