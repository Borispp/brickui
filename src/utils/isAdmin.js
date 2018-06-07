import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import appRoutes from 'routes/app';
import roles from 'utils/roleHelper';

import { isUserAuthenticated, getUserRole, getUserCompanyId } from 'modules/account/selectors';
import { withParams } from 'utils/url';

export default WrappedComponent => {
  const isAdmin = ({ isAuthenticated, userRole, companyId, ...props }) => {
    if (isAuthenticated && !(userRole === roles.admin || userRole === roles.globalAdmin)) {
      return <Redirect to={withParams(appRoutes.dashboard.questionnairesList, { companyId })} />;
    }

    return <WrappedComponent {...props} />;
  };

  isAdmin.propTypes = {
    isAuthenticated: PropTypes.bool,
    userRole: PropTypes.string,
    companyId: PropTypes.string,
  };

  isAdmin.defaultProps = {
    isAuthenticated: null,
    userRole: null,
    companyId: null,
  };

  return connect((state, props) => ({
    isAuthenticated: isUserAuthenticated(state, props),
    userRole: getUserRole(state, props),
    companyId: getUserCompanyId(state, props),
  }))(isAdmin);
};
