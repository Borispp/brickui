import api from 'routes/api';
import { getRequest, postRequest, putRequest } from 'modules/api/actions';

import { withParams } from 'utils/url';

export const SIGN_OUT = 'SIGN_OUT';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_VERIFICATION_PENDING_EMAIL = 'UPDATE_VERIFICATION_PENDING_EMAIL';
export const UPDATE_VERIFICATION_STATUS = 'UPDATE_VERIFICATION_STATUS';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const UPDATE_ROLE_STATUS = 'UPDATE_ROLE_STATUS';
export const CLEAR_APP = 'CLEAR_APP';
export const updateUser = payload => ({ type: UPDATE_USER, payload });
export const updateVerificationPendingEmail = payload => ({ type: UPDATE_VERIFICATION_PENDING_EMAIL, payload });
export const clearVerificationPendingEmail = () => ({ type: UPDATE_VERIFICATION_PENDING_EMAIL, payload: null });
export const updateVerificationStatus = payload => ({ type: UPDATE_VERIFICATION_STATUS, payload });
export const clearVerificationStatus = () => ({ type: UPDATE_VERIFICATION_STATUS, payload: null });
export const updateRoleStatus = payload => ({ type: UPDATE_ROLE_STATUS, payload });

export const signOutUser = () => ({ type: SIGN_OUT });

export const clearApp = () => dispatch => {
  dispatch({
    type: CLEAR_APP,
  });
};

export const loadCurrentUser = () => getRequest(api.user.current);

export const loadUserRole = () => getRequest(api.user.getRole);

export const updateUserStatus = () => async dispatch => {
  try {
    const user = await loadCurrentUser();
    dispatch(updateUser(user));
    return user;
  } catch (e) {
    return e;
  }
};

export const updateUserRole = () => async dispatch => {
  const response = await loadUserRole();

  if (response.status !== 'error') {
    dispatch(updateRoleStatus(response));
  }
  return response;
};

export const loginUser = ({ email, password }) => async dispatch => {
  try {
    const response = await postRequest(api.user.login, {
      username: email,
      password,
    });

    if (response.status !== 'error') {
      return await dispatch(updateUserStatus());
    }

    return response;
  } catch (err) {
    return err;
  }
};

export const registerUser = ({ fullName, email, password }) => async dispatch => {
  try {
    const user = await postRequest(api.user.register, {
      fullName,
      email,
      password,
    });

    if (user.status === 'error') {
      return user;
    }

    dispatch(updateUser(user));
    return user;
  } catch (err) {
    return err;
  }
};

export const registerInvitedUser = ({ inviteId, invitationToken, fullName, password, role, companyId }) => async () => {
  try {
    const user = await postRequest(withParams(api.user.registerInvited, { inviteId }), {
      invitationToken,
      fullName,
      password,
      role,
      companyId,
    });
    if (user.status === 'error') {
      return user;
    }

    return user;
  } catch (err) {
    return err;
  }
};

export const editUser = ({ fullName, email, hasEmailNotifications }) => async dispatch => {
  try {
    const user = await putRequest(api.user.current, {
      fullName,
      email,
      hasEmailNotifications,
    });

    dispatch(updateUser(user));
    return user;
  } catch (err) {
    return err;
  }
};

export const sendVerificationToken = ({ userId, token }) => async dispatch => {
  try {
    const verification = await postRequest(api.user.verification, {
      userId,
      token,
    });
    dispatch(updateVerificationStatus(verification));
    return verification;
  } catch (err) {
    dispatch(updateVerificationStatus(err));
    return err;
  }
};

export const forgotPassword = ({ username }) => async () => {
  try {
    return await postRequest(api.user.forgotPassword, {
      username,
    });
  } catch (err) {
    return err;
  }
};

export const resetPassword = ({ userId, token, newPassword }) => async () => {
  try {
    return await postRequest(api.user.resetPassword, {
      userId,
      token,
      newPassword,
    });
  } catch (err) {
    return err;
  }
};

export const signOut = () => async dispatch => {
  try {
    document.cookie = 'api-session-id=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    await postRequest(api.user.logout);
    return dispatch(clearApp());
  } catch (err) {
    return err;
  }
};
