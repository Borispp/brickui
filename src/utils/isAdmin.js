import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import appRoutes from 'routes/app';
import roles from 'utils/roleHelper';

import { isUserAuthenticated, getUserRole } from 'modules/account/selectors';

export default WrappedComponent => {
  const isAdmin = ({ isAuthenticated, userRole }) => {
    if (isAuthenticated && !(userRole === roles.admin || userRole === roles.globalAdmin)) {
      return <Redirect to={appRoutes.dashboard.dashboard} />;
    }

    return <WrappedComponent />;
  };

  isAdmin.propTypes = {
    isAuthenticated: PropTypes.bool,
    userRole: PropTypes.string,
  };

  isAdmin.defaultProps = {
    isAuthenticated: null,
    userRole: null,
  };

  return connect((state, props) => ({
    isAuthenticated: isUserAuthenticated(state, props),
    userRole: getUserRole(state, props),
  }))(isAdmin);
};
