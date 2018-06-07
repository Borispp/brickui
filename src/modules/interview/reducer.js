import {
  UPDATE_INTERVIEW_USER_LIST,
  UPDATE_INTERVIEW,
  UPDATE_INTERVIEW_QUESTIONNAIRE,
  UPDATE_INTERVIEW_REVIEW,
  CLEAR_INTERVIEW_REVIEW,
  UPDATE_INTERVIEW_BY_ID,
  CLEAR_INTERVIEW_BY_ID,
  UPDATE_ALL_REVIEWS,
  CLEAR_ALL_REVIEWS,
} from './actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_INTERVIEW_USER_LIST:
      return { ...state, userList: { [action.payload.questionnaireId]: action.payload.userList } };
    case UPDATE_INTERVIEW:
      return { ...state, interview: action.payload };
    case UPDATE_INTERVIEW_REVIEW:
      return { ...state, review: action.payload };
    case CLEAR_INTERVIEW_REVIEW:
      return { ...state, review: null };
    case UPDATE_INTERVIEW_BY_ID:
      return { ...state, interviewById: action.payload };
    case CLEAR_INTERVIEW_BY_ID:
      return { ...state, interviewById: null };
    case UPDATE_INTERVIEW_QUESTIONNAIRE:
      return { ...state, questionnaire: action.payload };
    case UPDATE_ALL_REVIEWS:
      return { ...state, allReviews: action.payload };
    case CLEAR_ALL_REVIEWS:
      return { ...state, allReviews: [] };
    default:
      return state;
  }
}
