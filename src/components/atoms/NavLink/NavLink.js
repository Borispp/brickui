import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import toLower from 'lodash/toLower';

import styles from './NavLink.scss';

const NavLink = ({ href, ...props }) => <RouterNavLink {...props} to={toLower(href || '')} />;

NavLink.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  activeClassName: PropTypes.string,
};

NavLink.defaultProps = {
  href: null,
  activeClassName: styles.active,
};

export default NavLink;
