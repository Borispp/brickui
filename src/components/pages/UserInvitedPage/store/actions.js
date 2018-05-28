import { getRequest } from 'modules/api/actions';
import api from 'routes/api';
import { withParams } from 'utils/url';

/* eslint-disable */
export default ({ inviteId, token }) => async () =>
  getRequest(withParams(api.user.getInvitationData, { inviteId }), { token });
