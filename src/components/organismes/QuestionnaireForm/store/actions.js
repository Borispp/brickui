import { SubmissionError } from 'redux-form';
import api from 'routes/api';
import { postRequest, putRequest } from 'modules/api/actions';
import { withParams } from 'utils/url';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async (data, dispatch, { match: { params: { companyId, questionnaireId } } }) => {
  const { errors, status, message } = questionnaireId
    ? await putRequest(withParams(api.questionnaire.questionnaireEdit, { companyId, questionnaireId }), {
        ...data,
      })
    : await postRequest(withParams(api.questionnaire.questionnaireAdd, { companyId }), {
        ...data,
      });

  if (errors) {
    throw new SubmissionError(errors);
  }

  if (status === 'error' && message) {
    throw new SubmissionError({
      _error: message,
    });
  }
};
