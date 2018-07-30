import merge from 'lodash/merge';
import translations from './translations';

// TODO: When we'll have a config object, or some way to get translations from API,
// we must load them into state.systemData.translations
// eslint-disable-next-line import/prefer-default-export
export const getTranslations = state =>
  // state.systemData.translations will contain translations from server
  merge({}, translations, state.systemData.translations || {});
