import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import appRoutes from 'routes/app';

import { isUserAuthenticated } from 'modules/account/selectors';

export default WrappedComponent => {
  const IsAuthenticated = ({ isAuthenticated, ...props }) => {
    if (!isAuthenticated) {
      return <Redirect to={appRoutes.account.signIn} />;
    }

    return <WrappedComponent {...props} />;
  };

  IsAuthenticated.propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  IsAuthenticated.defaultProps = {
    isAuthenticated: null,
  };

  return connect((state, props) => ({
    isAuthenticated: isUserAuthenticated(state, props),
  }))(IsAuthenticated);
};
