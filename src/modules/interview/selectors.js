import { createSelector } from 'reselect';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import moment from 'moment';

export const getInterviewReducer = state => state.interview;

export const getInterviewUserPassedList = questionnaireId =>
  createSelector(getInterviewReducer, interview =>
    // eslint-disable-next-line arrow-body-style
    map(filter(get(interview, `userList.${questionnaireId}`), user => user.isSaved), intreview => {
      return { ...intreview, updatedAt: moment(intreview.updatedAt).format('DD MMMM, YYYY') };
    }),
  );

export const getInterviewUserIsntPassedList = questionnaireId =>
  createSelector(getInterviewReducer, interview =>
    // eslint-disable-next-line arrow-body-style
    map(filter(get(interview, `userList.${questionnaireId}`), user => !user.isSaved), intreview => {
      return { ...intreview, createdAt: moment(intreview.createdAt).format('DD MMMM, YYYY') };
    }),
  );

export const getInterview = createSelector(getInterviewReducer, interview => get(interview, 'interview'));

export const getQuestionnaire = createSelector(getInterviewReducer, interview => get(interview, 'questionnaire'));

export const getInterviewById = createSelector(getInterviewReducer, interview => {
  const interviewById = get(interview, 'interviewById');
  return { ...interviewById, updatedAt: interviewById && moment(interviewById.updatedAt).format('DD MMMM, YYYY') };
});

export const getInterviewReview = createSelector(getInterviewReducer, interview => get(interview, 'review'));

export const getInterviewParticipants = createSelector(getInterviewReducer, interview =>
  get(interview, 'participants'),
);

export const getInterviewAllReviews = createSelector(getInterviewReducer, interview => {
  const allReviews = get(interview, 'allReviews');
  return map(allReviews, review => {
    const newReview = { ...review };
    newReview.updatedAt = moment(review.updatedAt).format('DD MMM, YYYY');
    return newReview;
  });
});
