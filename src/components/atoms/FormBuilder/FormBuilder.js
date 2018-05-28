import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, getFormValues, getFormInitialValues } from 'redux-form';

import get from 'lodash/get';
import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';

import { reduxFormValidator, reduxFormAsyncValidator } from 'valirator';

const ReduxForm = reduxForm({
  destroyOnUnmount: true,
  enableReinitialize: true,
});

const FormBuilder = config => WrappedComponent => {
  const Form = ({ handleSubmit, onSubmit, formClassName, ...props }) => (
    <form onSubmit={handleSubmit(onSubmit)} className={formClassName} noValidate>
      <WrappedComponent {...props} />
    </form>
  );

  Form.propTypes = {
    onSubmit: PropTypes.func,
    formClassName: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
  };

  Form.defaultProps = {
    onSubmit: noop,
    formClassName: null,
  };

  const connector = connect((state, props) => {
    const {
      key,
      form,
      warn,
      validate,
      asyncValidate,

      ...restConfig
    } = isFunction(config) ? config(props) : config;

    const formName = key ? `${form}_${get(props, key)}` : form;

    return {
      ...restConfig,

      form: formName,
      warn: reduxFormValidator(warn),
      validate: reduxFormValidator(validate),
      asyncValidate: reduxFormAsyncValidator(asyncValidate),
      formValues: getFormValues(formName)(state),
      formInitialValues: getFormInitialValues(formName)(state),
    };
  });

  return connector(ReduxForm(Form));
};

export default FormBuilder;
