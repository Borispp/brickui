import api from 'routes/api';
import { getRequest, deleteRequest } from 'modules/api/actions';
import { withParams } from 'utils/url';

export const UPDATE_INTERVIEW_USER_LIST = 'UPDATE_INTERVIEW_USER_LIST';
export const UPDATE_INTERVIEW = 'UPDATE_INTERVIEW';
export const UPDATE_INTERVIEW_QUESTIONNAIRE = 'UPDATE_INTERVIEW_QUESTIONNAIRE';
export const UPDATE_INTERVIEW_REVIEW = 'UPDATE_INTERVIEW_REVIEW';
export const CLEAR_INTERVIEW_REVIEW = 'CLEAR_INTERVIEW_REVIEW';
export const UPDATE_INTERVIEW_BY_ID = 'UPDATE_INTERVIEW_BY_ID';
export const CLEAR_INTERVIEW_BY_ID = 'CLEAR_INTERVIEW_BY_ID';
export const UPDATE_ALL_REVIEWS = 'UPDATE_ALL_REVIEWS';
export const CLEAR_ALL_REVIEWS = 'CLEAR_ALL_REVIEWS';

export const updateInterviewUserList = payload => ({ type: UPDATE_INTERVIEW_USER_LIST, payload });
export const updateInterview = payload => ({ type: UPDATE_INTERVIEW, payload });
export const updateInterviewReview = payload => ({ type: UPDATE_INTERVIEW_REVIEW, payload });
export const clearInterviewReview = () => ({ type: CLEAR_INTERVIEW_REVIEW });
export const updateInterviewById = payload => ({ type: UPDATE_INTERVIEW_BY_ID, payload });
export const clearInterviewById = () => ({ type: CLEAR_INTERVIEW_BY_ID });
export const updateQuestionnaire = payload => ({ type: UPDATE_INTERVIEW_QUESTIONNAIRE, payload });
export const updateAllReviews = payload => ({ type: UPDATE_ALL_REVIEWS, payload });
export const clearAllReviews = payload => ({ type: CLEAR_ALL_REVIEWS, payload });

export const getInterviewUserList = ({ companyId, questionnaireId }) => async dispatch => {
  const userList = await getRequest(withParams(api.interview.userList, { questionnaireId, companyId }));
  return dispatch(updateInterviewUserList({ questionnaireId, userList }));
};

export const interviewDelete = tokenId => async () =>
  deleteRequest(withParams(api.interview.interviewDelete, { tokenId }));

export const getInterview = tokenId => async dispatch => {
  const { interview, questionnaire, status } = await getRequest(withParams(api.interview.getInterview, { tokenId }));

  if (status !== 'error') {
    dispatch(updateInterview(interview));
    dispatch(updateQuestionnaire(questionnaire));
  }
};

export const getInterviewReview = ({ companyId, interviewId }) => async dispatch => {
  const review = await getRequest(withParams(api.interview.getInterviewReview, { companyId, interviewId }));

  if (review && review.status !== 'error') {
    dispatch(updateInterviewReview(review));
  }
};

export const getInterviewById = ({ companyId, interviewId }) => async dispatch => {
  try {
    const response = await getRequest(withParams(api.interview.getInterviewById, { companyId, interviewId }));
    if (response && response.status !== 'error') {
      return dispatch(updateInterviewById(response));
    }

    return null;
  } catch (e) {
    return e;
  }
};

export const getAllReviews = ({ companyId, interviewId }) => async dispatch => {
  try {
    const response = await getRequest(withParams(api.interview.getInterviewAllReviews, { companyId, interviewId }));
    if (response && response.status !== 'error') {
      return dispatch(updateAllReviews(response));
    }
    return response;
  } catch (e) {
    return e;
  }
};
