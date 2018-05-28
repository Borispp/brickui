import api from 'routes/api';
import { getRequest } from 'modules/api/actions';

export const ADD_ROLES = 'ADD_ROLES';

export const addRoles = payload => ({ type: ADD_ROLES, payload });

export const loadRoles = () => async dispatch => {
  const response = await getRequest(api.systemData.roles);

  if (response.status !== 'error') {
    dispatch(addRoles(response));
  }
  return response;
};
