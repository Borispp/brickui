import api from 'routes/api';
import { getRequest, deleteRequest } from 'modules/api/actions';
import { withParams } from 'utils/url';

export const UPDATE_QUESTIONNAIRE = 'UPDATE_QUESTIONNAIRE';
export const UPDATE_QUESTIONNAIRE_LIST = 'UPDATE_QUESTIONNAIRE_LIST';

export const updateQuestionnaire = payload => ({ type: UPDATE_QUESTIONNAIRE, payload });
export const updateQuestionnaireList = payload => ({ type: UPDATE_QUESTIONNAIRE_LIST, payload });

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

export const questionnaireDelete = questionnaireId => async () =>
  deleteRequest(withParams(api.questionnaire.questionnaireDelete, { questionnaireId }));
