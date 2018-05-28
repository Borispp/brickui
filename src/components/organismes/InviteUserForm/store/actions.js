/* eslint-disable */
import { SubmissionError } from 'redux-form';
import { addUserInvitation } from 'modules/users/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ userName, email, companyId, roleName }, dispatch) => {
  const { errors, status, message } = await dispatch(addUserInvitation({ userName, email, companyId, roleName }));

  if (errors) {
    throw new SubmissionError(errors);
  }

  if (status === 'error' && message) {
    throw new SubmissionError({
      _error: message,
    });
  }
};
