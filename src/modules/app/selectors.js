import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getState = state => get(state, 'app');
export const getNotification = createSelector(getState, state => get(state, 'notification'));
