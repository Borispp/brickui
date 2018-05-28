import { SubmissionError } from 'redux-form';
import { putRequest } from 'modules/api/actions';

import api from 'routes/api';
import { withParams } from 'utils/url';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ userName, email, phone }, dispatch, { tokenId }) => {
  const { errors, status, message } = await putRequest(withParams(api.interview.updateInterview, { tokenId }), {
    userName,
    email,
    phone,
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
