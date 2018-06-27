import api from 'routes/api';
import { postRequest, getRequest, putRequest, deleteRequest } from 'modules/api/actions';
import { withParams } from 'utils/url';

export const UPDATE_COMPANIES_LIST = 'UPDATE_COMPANIES_LIST';
export const UPDATE_COMPANY_USER_LIST = 'UPDATE_COMPANY_USER_LIST';
export const UPDATE_COMPANY_PARTICIPANTS = 'UPDATE_COMPANY_PARTICIPANTS';

export const updateCompaniesList = payload => ({ type: UPDATE_COMPANIES_LIST, payload });
export const updateCompanyUserList = payload => ({ type: UPDATE_COMPANY_USER_LIST, payload });
export const updateCompanyParticipants = payload => ({ type: UPDATE_COMPANY_PARTICIPANTS, payload });

export const addNewCompany = data => async () => postRequest(api.companies.addNewCompany, { ...data });

export const getCompaniesList = () => async dispatch => {
  const companiesList = await getRequest(api.companies.companiesList);
  dispatch(updateCompaniesList(companiesList));
};

export const getCompanyParticipants = companyId => async dispatch => {
  const companyParticipants = await getRequest(withParams(api.companies.companyParticipants, { companyId }));

  if (companyParticipants.status !== 'error') {
    dispatch(updateCompanyParticipants(companyParticipants));
  }
};

export const companyDelete = companyId => async dispatch => {
  await deleteRequest(withParams(api.companies.companyDelete, { companyId }));
  return dispatch(getCompaniesList());
};

export const companyUpdateExpireDate = ({ companyId, expiresAt }) => () =>
  putRequest(withParams(api.companies.companyUpdateExpireDate, { companyId }), { expiresAt });

export const getCompanyUserList = companyId => async dispatch => {
  const userList = await getRequest(withParams(api.companies.companyUserList, { companyId }));
  return dispatch(updateCompanyUserList({ companyId, userList }));
};
