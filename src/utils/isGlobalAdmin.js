import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import appRoutes from 'routes/app';
import roles from 'utils/roleHelper';
import { withParams } from 'utils/url';

import { isUserAuthenticated, getUserRole, getUserCompanyId } from 'modules/account/selectors';

export default WrappedComponent => {
  const isGlobalAdmin = ({ isAuthenticated, userRole, companyId }) => {
    if (isAuthenticated && userRole !== roles.globalAdmin) {
      return <Redirect to={withParams(appRoutes.dashboard.questionnairesList, { companyId })} />;
    }

    return <WrappedComponent />;
  };

  isGlobalAdmin.propTypes = {
    isAuthenticated: PropTypes.bool,
    userRole: PropTypes.string,
    companyId: PropTypes.string,
  };

  isGlobalAdmin.defaultProps = {
    isAuthenticated: null,
    userRole: null,
    companyId: null,
  };

  return connect((state, props) => ({
    isAuthenticated: isUserAuthenticated(state, props),
    userRole: getUserRole(state, props),
    companyId: getUserCompanyId(state, props),
  }))(isGlobalAdmin);
};
