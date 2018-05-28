import { SubmissionError } from 'redux-form';
import { loginUser } from 'modules/account/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ email, password }, dispatch) => {
  const { errors, status, message } = await dispatch(loginUser({ email, password }));

  if (errors) {
    throw new SubmissionError(errors);
  }

  if (status === 'error' && message) {
    throw new SubmissionError({
      _error: message,
    });
  }
};
