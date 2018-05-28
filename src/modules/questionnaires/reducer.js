import { UPDATE_QUESTIONNAIRE, UPDATE_QUESTIONNAIRE_LIST } from './actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_QUESTIONNAIRE:
      return { ...state, questionnaire: action.payload };
    case UPDATE_QUESTIONNAIRE_LIST:
      return { ...state, questionnaireList: action.payload };
    default:
      return state;
  }
}
