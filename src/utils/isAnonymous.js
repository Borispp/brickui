import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import appRoutes from 'routes/app';
import roles from 'utils/roleHelper';
import { withParams } from 'utils/url';

import { isUserAuthenticated, getUserRole, getUserCompanyId } from 'modules/account/selectors';

export default WrappedComponent => {
  const isAnonymous = ({ isAuthenticated, userRole, companyId, ...props }) => {
    if (isAuthenticated && userRole !== roles.globalAdmin) {
      return <Redirect to={withParams(appRoutes.dashboard.questionnairesList, { companyId })} />;
    }

    if (isAuthenticated && userRole === roles.globalAdmin) {
      return <Redirect to={appRoutes.dashboard.companiesList} />;
    }

    return <WrappedComponent {...props} />;
  };

  isAnonymous.propTypes = {
    isAuthenticated: PropTypes.bool,
    userRole: PropTypes.string,
    companyId: PropTypes.string,
  };

  isAnonymous.defaultProps = {
    isAuthenticated: null,
    userRole: null,
    companyId: null,
  };

  return connect((state, props) => ({
    isAuthenticated: isUserAuthenticated(state, props),
    userRole: getUserRole(state, props),
    companyId: getUserCompanyId(state, props),
  }))(isAnonymous);
};
