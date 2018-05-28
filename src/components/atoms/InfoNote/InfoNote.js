import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from '../Block';
import Svg from '../Svg';

import styles from './InfoNote.scss';

const InfoNote = ({ children, className }) => (
  <Block className={classNames(className, styles.wrapper)}>
    <Block className={styles.content}>{children}</Block>
    <Svg type="info" className={styles.icon} />
  </Block>
);

InfoNote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

InfoNote.defaultProps = {
  className: null,
};

export default InfoNote;
