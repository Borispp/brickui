import api from 'routes/api';
import { postRequest } from 'modules/api/actions';

// eslint-disable-next-line import/prefer-default-export
export const emailResend = () => async () => postRequest(api.user.resendEmail);
