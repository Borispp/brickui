import { createSelector } from 'reselect';
import get from 'lodash/get';
import merge from 'lodash/merge';
import filter from 'lodash/filter';
import map from 'lodash/map';
import translations from './translations';

export const getSystemData = state => state.systemData;

export const getRoles = createSelector(getSystemData, systemData => get(systemData, 'roles'));

export const getRolesForRoadmapOwner = createSelector(getRoles, roles =>
  filter(roles, role => ['owner', 'admin', 'editor'].includes(role.name)),
);

export const getRolesList = createSelector(getRoles, roles =>
  map(roles, ({ _id, name }) => ({ value: _id, label: name })),
);

// TODO: When we'll have a config object, or some way to get translations from API,
// we must load them into state.systemData.translations
export const getTranslations = state =>
  // state.systemData.translations will contain translations from server
  merge({}, translations, state.systemData.translations || {});
