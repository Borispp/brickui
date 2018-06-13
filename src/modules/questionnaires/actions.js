import api from 'routes/api';
import { getRequest, deleteRequest } from 'modules/api/actions';
import { withParams } from 'utils/url';

export const UPDATE_QUESTIONNAIRE = 'UPDATE_QUESTIONNAIRE';
export const CLEAR_QUESTIONNAIRE = 'CLEAR_QUESTIONNAIRE';
export const UPDATE_QUESTIONNAIRE_LIST = 'UPDATE_QUESTIONNAIRE_LIST';
export const CLEAR_QUESTIONNAIRE_LIST = 'CLEAR_QUESTIONNAIRE_LIST';
export const UPDATE_QUESTIONNAIRE_USER_DETAILS_LIST = 'UPDATE_QUESTIONNAIRE_USER_DETAILS_LIST';
export const CLEAR_QUESTIONNAIRE_USER_DETAILS_LIST = 'CLEAR_QUESTIONNAIRE_USER_DETAILS_LIST';

export const updateQuestionnaire = payload => ({ type: UPDATE_QUESTIONNAIRE, payload });
export const clearQuestionnaire = () => ({ type: CLEAR_QUESTIONNAIRE });
export const updateQuestionnaireList = payload => ({ type: UPDATE_QUESTIONNAIRE_LIST, payload });
export const clearQuestionnaireList = () => ({ type: CLEAR_QUESTIONNAIRE_LIST });

export const updateQuestionnaireInterviewUserDetails = payload => ({
  type: UPDATE_QUESTIONNAIRE_USER_DETAILS_LIST,
  payload,
});

export const clearQuestionnaireInterviewUserDetails = () => ({ type: CLEAR_QUESTIONNAIRE_USER_DETAILS_LIST });

export const getQuestionnaireSingle = questionnaireId => async dispatch => {
  const response = await getRequest(withParams(api.questionnaire.questionnaireSingle, { questionnaireId }));
  if (response.status !== 'error') {
    return dispatch(updateQuestionnaire(response));
  }
  return response;
};

export const getQuestionnaireList = companyId => async dispatch => {
  const response = await getRequest(withParams(api.questionnaire.questionnaireList, { companyId }));

  if (response.status !== 'error') {
    return dispatch(updateQuestionnaireList(response));
  }

  return response;
};

export const getQuestionnaireInterviewUserDetails = ({ companyId, questionnaireId }) => async dispatch => {
  const response = await getRequest(withParams(api.questionnaire.getUserDetailsList, { companyId, questionnaireId }));

  if (response && response.status !== 'error') {
    return dispatch(updateQuestionnaireInterviewUserDetails(response));
  }

  return response;
};

export const questionnaireDelete = ({ questionnaireId, companyId }) => async () =>
  deleteRequest(withParams(api.questionnaire.questionnaireDelete, { companyId, questionnaireId }));
