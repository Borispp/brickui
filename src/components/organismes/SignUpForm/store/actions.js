import { SubmissionError } from 'redux-form';
import { registerUser } from 'modules/account/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ fullName, email, password }, dispatch) => {
  try {
    const response = await dispatch(registerUser({ fullName, email, password }));

    const { errors, status, message } = response;

    if (errors) {
      throw new SubmissionError(errors);
    }

    if (status === 'error' && message) {
      throw new SubmissionError({
        _error: message,
      });
    }
  } catch (e) {
    throw new SubmissionError({
      // eslint-disable-next-line no-underscore-dangle
      _error: e.errors._error,
    });
  }
};
