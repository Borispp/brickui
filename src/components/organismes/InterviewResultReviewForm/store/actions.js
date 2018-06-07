import { SubmissionError } from 'redux-form';
import api from 'routes/api';
import { withParams } from 'utils/url';
import { postRequest, putRequest } from 'modules/api/actions';
import { getInterviewReview } from 'modules/interview/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ id, interviewId, companyId, review, rate }, dispatch) => {
  const request = id ? putRequest : postRequest;

  const { errors, status, message } = await request(withParams(api.interview.postInterviewReview, { interviewId }), {
    id,
    companyId,
    review,
    rate,
  });

  await dispatch(getInterviewReview({ companyId, interviewId }));

  if (errors) {
    throw new SubmissionError(errors);
  }

  if (status === 'error' && message) {
    throw new SubmissionError({
      _error: message,
    });
  }
};
