import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Block.scss';

const Block = ({ className, withRef, indention, ...props }) => (
  <div ref={withRef} className={classNames(className, styles[indention])} {...props} />
);

Block.propTypes = {
  withRef: PropTypes.func,
  className: PropTypes.string,
  indention: PropTypes.oneOf(['none', 'small', 'normal', 'mediumLarge', 'large']),
};

Block.defaultProps = {
  className: null,
  withRef: null,
  indention: 'none',
};

export default Block;
