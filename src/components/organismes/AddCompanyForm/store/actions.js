import { SubmissionError } from 'redux-form';
import { addNewCompany } from 'modules/companies/actions';

// eslint-disable-next-line import/prefer-default-export
export const onSubmit = async ({ companyName, userName, email }, dispatch, { roleName }) => {
  const { errors, status, message } = await dispatch(addNewCompany({ companyName, userName, email, roleName }));

  if (errors) {
    throw new SubmissionError(errors);
  }

  if (status === 'error' && message) {
    throw new SubmissionError({
      _error: message,
    });
  }
};
