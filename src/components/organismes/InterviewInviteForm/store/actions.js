import { SubmissionError } from 'redux-form';
import api from 'routes/api';
import { withParams } from 'utils/url';
import { postRequest } from 'modules/api/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ userName, email, companyId, questionnaireId }) => {
  const { errors, status, message } = await postRequest(
    withParams(api.interview.invite, { companyId, questionnaireId }),
    {
      userName,
      email,
    },
  );

  if (errors) {
    throw new SubmissionError(errors);
  }

  if (status === 'error' && message) {
    throw new SubmissionError({
      _error: message,
    });
  }
};
