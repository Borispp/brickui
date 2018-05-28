import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';

import styles from './InputErrorMessage.scss';

// eslint-disable-next-line no-confusing-arrow
const InputErrorMessage = ({ children, show, className }) =>
  show ? <Block className={classNames(styles.wrapper, className)}>{children}</Block> : null;

InputErrorMessage.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  className: PropTypes.string,
};

InputErrorMessage.defaultProps = {
  className: null,
  children: null,
  show: false,
};

export default InputErrorMessage;
