import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendVerificationToken, updateUserStatus } from 'modules/account/actions';
import { isUserAuthenticated as isUserAuthenticatedSelector } from 'modules/account/selectors';

import appRoutes from 'routes/app';

class VerificationPage extends PureComponent {
  componentDidMount = async () => {
    const { isUserAuthenticated, match: { params: { userId, token } = {} } } = this.props;

    await this.props.sendVerificationToken({ userId, token });
    await this.props.updateUserStatus();

    if (isUserAuthenticated) {
      this.props.history.push(appRoutes.dashboard.dashboard);
    } else {
      this.props.history.push(appRoutes.account.signIn);
    }
  };

  render() {
    return false;
  }
}

VerificationPage.propTypes = {
  isUserAuthenticated: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
      token: PropTypes.string,
    }),
  }),
  sendVerificationToken: PropTypes.func.isRequired,
  updateUserStatus: PropTypes.func.isRequired,
};

VerificationPage.defaultProps = {
  isUserAuthenticated: false,
  history: {},
  match: {},
};

const mapStateToProps = state => ({
  isUserAuthenticated: isUserAuthenticatedSelector(state),
});

const mapDispatchToProps = {
  sendVerificationToken,
  updateUserStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationPage);
