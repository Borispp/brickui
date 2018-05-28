/* eslint-disable no-nested-ternary,jsx-a11y/anchor-has-content,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ href, onClick, isExternal, ...props }) =>
  onClick ? (
    <a {...props} onClick={onClick} />
  ) : isExternal ? (
    <a {...props} href={href} target="_blank" />
  ) : (
    <RouterLink {...props} to={href} />
  );

Link.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  isExternal: PropTypes.bool,
};

Link.defaultProps = {
  href: null,
  onClick: null,
  isExternal: false,
};

export default Link;
