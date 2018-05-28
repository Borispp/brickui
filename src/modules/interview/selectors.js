import { createSelector } from 'reselect';
import get from 'lodash/get';
import filter from 'lodash/filter';

export const getInterviewReducer = state => state.interview;

export const getInterviewUserPassedList = questionnaireId =>
  createSelector(getInterviewReducer, interview =>
    filter(get(interview, `userList.${questionnaireId}`), user => user.isSaved),
  );

export const getInterviewUserIsntPassedList = questionnaireId =>
  createSelector(getInterviewReducer, interview =>
    filter(get(interview, `userList.${questionnaireId}`), user => !user.isSaved),
  );

export const getInterview = createSelector(getInterviewReducer, interview => get(interview, 'interview'));

export const getQuestionnaire = createSelector(getInterviewReducer, interview => get(interview, 'questionnaire'));
