import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getUser = state => state.user;

export const isUserAuthenticated = createSelector(getUser, user => !!get(user, '_id'));

export const getUserId = createSelector(getUser, user => get(user, '_id'));

export const getUserEmail = createSelector(getUser, user => get(user, 'local.email'));

export const getUserRole = createSelector(getUser, user => get(user, 'local.role.name'));

export const getUserCompanyId = createSelector(getUser, user => get(user, 'local.company._id'));

export const getUserCompanyName = createSelector(getUser, user => get(user, 'local.company.name'));

export const getUserCompanyExpireDate = createSelector(getUser, user => get(user, 'local.company.expiresAt'));

export const isUserVerified = createSelector(getUser, user => !!get(user, 'local.verified'));

export const getVerificationPendingEmail = createSelector(getUser, user => get(user, 'verificationPendingEmail'));

export const getVerificationStatus = createSelector(getUser, user => get(user, 'verificationStatus'));
