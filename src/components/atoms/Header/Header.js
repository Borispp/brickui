import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Header = ({ children, className }) => <header className={classNames(className)}>{children}</header>;

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  className: null,
};

export default Header;
