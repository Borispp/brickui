import { createSelector } from 'reselect';
import get from 'lodash/get';

export const getQuestionnaires = state => state.questionnaires;

export const getQuestionnaire = createSelector(getQuestionnaires, questionnaires =>
  get(questionnaires, 'questionnaire'),
);

export const getQuestionnaireList = createSelector(getQuestionnaires, questionnaires =>
  get(questionnaires, 'questionnaireList'),
);
