import get from 'lodash/get';
import { withParams } from 'utils/url';

// TODO: make loaders
// import { showLoader, hideLoader } from 'utils/loader';

import { signOut } from 'modules/account/actions';

const baseUrl = process.env.REACT_APP_API_PUBLIC_URL || '';

const getDefaultHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };
  return headers;
};

const request = (url, { ...options }) => {
  const apiUrl = `${baseUrl}/${url}`;

  return new Promise(async resolve => {
    try {
      const response = await fetch(apiUrl, options);

      const json = await response.json().catch(() => {});

      if (!response.ok) {
        if (response.status === 400) {
          resolve(json);
        }

        if (response.status === 401) {
          signOut();
        }

        if (response.status === 404) {
          resolve({
            status: 'error',
            message: (json && json.message) || 'Not found',
          });
        }

        resolve(json);
      }

      if (response.ok && json) {
        resolve(json);
      } else {
        resolve({
          status: 'success',
          message: (json && json.message) || 'Success',
        });
      }

      resolve(json);
    } catch (e) {
      const message = (e.message && e.message.toString()) || 'Request error';
      const response = {
        status: 'error',
        message,
      };
      resolve(response);
    }
  });
};

export const getRequest = (url, params, options) =>
  request(withParams(url, params), {
    ...options,
    method: 'GET',
    headers: {
      ...getDefaultHeaders(),
      ...get(options, 'headers', {}),
    },
    credentials: 'include',
  });

export const postRequest = (url, body, params, options) =>
  request(withParams(url, params), {
    ...options,
    method: 'POST',
    headers: {
      ...getDefaultHeaders(),
      ...get(options, 'headers', {}),
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

export const putRequest = (url, body, params, options) =>
  request(withParams(url, params), {
    ...options,
    method: 'PUT',
    headers: {
      ...getDefaultHeaders(),
      ...get(options, 'headers', {}),
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

export const deleteRequest = (url, params, options) =>
  request(withParams(url, params), {
    ...options,
    method: 'DELETE',
    headers: {
      ...getDefaultHeaders(),
      ...get(options, 'headers', {}),
    },
    credentials: 'include',
  });

export const postMediaRequest = (url, body, params, options) =>
  request(withParams(url, params), {
    ...options,
    method: 'POST',
    credentials: 'include',
    body,
  });

export const putMediaRequest = (url, body, params, options) =>
  request(withParams(url, params), {
    ...options,
    method: 'PUT',
    credentials: 'include',
    body,
  });

// TODO: clear app cache
// export const clearCache = () => dispatch =>
//   dispatch({
//     type: CLEAR_CACHE,
//   });
