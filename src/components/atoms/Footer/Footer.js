import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = ({ children, className }) => <footer className={classNames(className)}>{children}</footer>;

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: null,
};

export default Footer;
