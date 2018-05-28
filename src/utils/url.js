import qs from 'qs';
import withQuery from 'with-query';
import get from 'lodash/get';
import omit from 'lodash/omit';
import filter from 'lodash/filter';
import pickBy from 'lodash/pickBy';
import trimEnd from 'lodash/trimEnd';

export const avatarApiUrl = process.env.REACT_APP_AVATAR_URL || '';

export const getAvatarImage = avatar => {
  if (avatar && avatar.startsWith('http')) {
    return avatar;
  }

  if (avatar) {
    return `${avatarApiUrl}/${avatar}`;
  }

  return null;
};

export const trimUrl = url => {
  if (typeof url !== 'string') {
    return null;
  }

  let cleanUrl = url;

  // remove leading forward slash
  if (cleanUrl.startsWith('/')) {
    cleanUrl = cleanUrl.slice(1);
  }

  // remove trailing forward slash
  if (cleanUrl.endsWith('/')) {
    cleanUrl = cleanUrl.substr(0, cleanUrl.length - 1);
  }

  return cleanUrl;
};

/**
 * Takes an url and params and returns combined url
 * @param {String} url
 * @param {Object} params
 */
export const withParams = (url, params = {}) => {
  let rest = { ...params };

  const urlWithParams = `${url}`
    .replace(/:([\w\d.]+)(\?)?/gim, (match, p1, p2) => {
      const param = get(rest, p1, p2 && '');

      rest = omit(rest, p1);

      return param;
    })
    .replace('//', '/');

  return withQuery(trimEnd(urlWithParams, '/'), pickBy(rest, p => p !== null && p !== undefined));
};

export const parseParams = search => qs.parse((search || '').replace(/^\?/, ''));

/**
 * Combine all parts into single url
 */
export const combineUrl = (...paths) => `/${trimUrl(filter(paths, path => !!path).join('/'))}`;
