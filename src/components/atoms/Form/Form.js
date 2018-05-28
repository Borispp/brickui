import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Form = ({ children, className, ...props }) => (
  <form {...props} className={classNames(className)}>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Form.defaultProps = {
  className: null,
};

export default Form;
