import { SubmissionError } from 'redux-form';
import { forgotPassword } from 'modules/account/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ username }, dispatch) => {
  const { errors, status, message } = await dispatch(forgotPassword({ username }));

  if (errors) {
    throw new SubmissionError(errors);
  }

  if (status === 'error' && message) {
    throw new SubmissionError({
      _error: message,
    });
  }
};
