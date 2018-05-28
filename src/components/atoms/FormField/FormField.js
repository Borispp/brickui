import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const FormField = ({ withRef, name, component, ...props }) => (
  <Field {...props} ref={withRef} withRef={!!withRef} name={name} component={component} />
);

FormField.propTypes = {
  withRef: PropTypes.func,
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
};

FormField.defaultProps = {
  withRef: null,
};

export default FormField;
