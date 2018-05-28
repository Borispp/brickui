import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Heading.scss';

const Heading = ({ type, indention, kind, background, className, ...props }) => {
  const Component = type;

  return (
    <Component {...props} className={classNames(styles[kind], styles[background], className, styles[indention])} />
  );
};

Heading.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  indention: PropTypes.oneOf(['small']),
  kind: PropTypes.oneOf(['rounded']),
  background: PropTypes.oneOf(['green']),
  className: PropTypes.string,
};

Heading.defaultProps = {
  indention: null,
  kind: null,
  background: null,
  className: null,
};

export default Heading;
