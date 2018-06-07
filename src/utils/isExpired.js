import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'components/atoms/Modal';

import ExpiredModal from 'components/molecules/ExpiredModal';

import { isExpired as isExpiredSelector, getUserRole } from 'modules/account/selectors';

import roles from 'utils/roleHelper';

export default WrappedComponent => {
  const IsAuthenticated = ({ isExpired, userRole, ...props }) => {
    if (isExpired && userRole !== roles.globalAdmin) {
      return (
        <React.Fragment>
          <WrappedComponent {...props} />
          <Modal isOpen onModalClose={false}>
            <ExpiredModal />
          </Modal>
        </React.Fragment>
      );
    }

    return <WrappedComponent {...props} />;
  };

  IsAuthenticated.propTypes = {
    isExpired: PropTypes.bool,
    userRole: PropTypes.string,
  };

  IsAuthenticated.defaultProps = {
    isExpired: null,
    userRole: null,
  };

  return connect((state, props) => ({
    isExpired: isExpiredSelector(state, props),
    userRole: getUserRole(state, props),
  }))(IsAuthenticated);
};
