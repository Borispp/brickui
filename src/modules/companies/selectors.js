import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getCompanies = state => state.companies;

export const getCompaniesList = createSelector(getCompanies, companies => get(companies, 'companiesList'));

export const getCompanyParticipants = createSelector(getCompanies, companies => get(companies, 'companyParticipants'));

export const getCompanyUserList = companyId =>
  createSelector(getCompanies, companies => get(companies, `userList.${companyId}`));
