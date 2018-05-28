import api from 'routes/api';
import { getRequest, deleteRequest } from 'modules/api/actions';
import { withParams } from 'utils/url';

export const UPDATE_INTERVIEW_USER_LIST = 'UPDATE_INTERVIEW_USER_LIST';
export const UPDATE_INTERVIEW = 'UPDATE_INTERVIEW';
export const UPDATE_INTERVIEW_QUESTIONNAIRE = 'UPDATE_INTERVIEW_QUESTIONNAIRE';

export const updateInterviewUserList = payload => ({ type: UPDATE_INTERVIEW_USER_LIST, payload });
export const updateInterview = payload => ({ type: UPDATE_INTERVIEW, payload });
export const updateQuestionnaire = payload => ({ type: UPDATE_INTERVIEW_QUESTIONNAIRE, payload });

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
