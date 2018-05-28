export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export const setNotificationSuccess = notification => ({
  type: SET_NOTIFICATION,
  payload: {
    type: 'success',
    ...notification,
  },
});

export const setNotificationError = notification => ({
  type: SET_NOTIFICATION,
  payload: {
    type: 'error',
    ...notification,
  },
});

export const setNotificationInfo = notification => ({
  type: SET_NOTIFICATION,
  payload: {
    type: 'info',
    ...notification,
  },
});

export const setNotificationWarning = notification => ({
  type: SET_NOTIFICATION,
  payload: {
    type: 'warn',
    ...notification,
  },
});
