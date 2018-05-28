import { SubmissionError } from 'redux-form';
import { registerInvitedUser } from 'modules/account/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ inviteId, invitationToken, fullName, password, role, companyId }, dispatch) => {
  try {
    const response = await dispatch(
      registerInvitedUser({ inviteId, invitationToken, fullName, password, role, companyId }),
    );

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
