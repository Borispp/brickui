import api from 'routes/api';
import { postRequest, deleteRequest } from 'modules/api/actions';
import { withParams } from 'utils/url';

// eslint-disable-next-line import/prefer-default-export
export const userDelete = userId => async () => deleteRequest(withParams(api.user.delete, { userId }));

export const inviteDelete = inviteId => async () => deleteRequest(withParams(api.user.deleteInvite, { inviteId }));

export const addUserInvitation = ({ userName, email, companyId, roleName }) => async () =>
  postRequest(api.user.addUserInvitation, { userName, email, companyId, roleName });
