import { SubmissionError } from 'redux-form';
import { resetPassword } from 'modules/account/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ newPassword }, dispatch, { match: { params: { userId, token } = {} } }) => {
  const { errors, status, message } = await dispatch(resetPassword({ userId, token, newPassword }));

  if (errors) {
    throw new SubmissionError(errors);
  }

  if (status === 'error' && message) {
    throw new SubmissionError({
      _error: message,
    });
  }
};
