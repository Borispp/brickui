import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'components/atoms/Modal';
import ResendEmailVerification from 'components/atoms/ResendEmailVerification';

import { clearVerificationStatus } from 'modules/account/actions';
import { getVerificationStatus, isUserVerified, getUserEmail } from 'modules/account/selectors';

export default WrappedComponent => {
  class isVerified extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isModalOpen: !this.props.isUserVerified && true, // !!
        verificationStatus: this.props.verificationStatus,
      };
    }

    componentDidMount() {
      this.props.clearVerificationStatus();
    }

    render() {
      const { userEmail } = this.props;
      const { isModalOpen, verificationStatus } = this.state;

      return (
        <React.Fragment>
          <Modal isOpen={isModalOpen} onModalClose={false}>
            <ResendEmailVerification email={userEmail} verificationStatus={verificationStatus} />
          </Modal>
          <WrappedComponent />
        </React.Fragment>
      );
    }
  }

  isVerified.propTypes = {
    isUserVerified: PropTypes.bool,
    userEmail: PropTypes.string,
    clearVerificationStatus: PropTypes.func.isRequired,
    verificationStatus: PropTypes.shape({
      status: PropTypes.string,
      message: PropTypes.string,
    }),
  };

  isVerified.defaultProps = {
    isUserVerified: null,
    userEmail: null,
    verificationStatus: {},
  };

  const mapStateToProps = (state, props) => ({
    isUserVerified: isUserVerified(state, props),
    userEmail: getUserEmail(state, props),
    verificationStatus: getVerificationStatus(state),
  });

  const mapDispatchToProps = {
    clearVerificationStatus,
  };

  return connect(mapStateToProps, mapDispatchToProps)(isVerified);
};
