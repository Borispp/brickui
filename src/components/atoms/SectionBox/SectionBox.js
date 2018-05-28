import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Section from '../Section';

import styles from './SectionBox.scss';

const SectionBox = ({ className, children, size, ...props }) => (
  <Section {...props} className={classNames(className, styles.wrapper, styles[size])}>
    {children}
  </Section>
);

SectionBox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['default']),
};

SectionBox.defaultProps = {
  className: null,
  size: 'default',
};

export default SectionBox;
