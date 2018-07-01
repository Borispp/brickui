import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';

import FormBuilder from 'components/atoms/FormBuilder';
import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import InputText from 'components/atoms/InputText';
import Message from 'components/atoms/Message';
import Button from 'components/atoms/Button';
import Modal from 'components/atoms/Modal';

import ModalContainer from 'components/molecules/ModalContainer';
import RegisterInfo from 'components/molecules/RegisterInfo';

import { getTranslations } from 'modules/systemData/selectors';
import { loginUser, clearVerificationPendingEmail, clearVerificationStatus } from 'modules/account/actions';
import { getVerificationPendingEmail, getVerificationStatus } from 'modules/account/selectors';

import appRoutes from 'routes/app';

import { onSubmit } from './store/actions';

import styles from './SignInForm.scss';

class SignInForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVerificationMessageOpen: false,
      isSignUpOpen: false,
      verificationStatus: this.props.verificationStatus || {},
    };
  }

  componentDidMount() {
    this.props.clearVerificationStatus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.verificationPendingEmail) {
      this.setState({
        isVerificationMessageOpen: true,
      });
    }
  }

  onVerificationStatusClose = () => {
    this.setState({
      verificationStatus: {},
    });
  };

  onVerificationMessageClose = () => {
    this.props.clearVerificationPendingEmail();

    this.setState({
      isVerificationMessageOpen: false,
    });
  };

  onSignUpModalOpen = () => this.setState({ isSignUpOpen: true });
  onSignUpModalClose = () => this.setState({ isSignUpOpen: false });

  resetForm = () => this.props.reset();

  render() {
    const { submitting, submitSucceeded, error, verificationPendingEmail, translations } = this.props;
    const { isSignUpOpen, isVerificationMessageOpen, verificationStatus: { status, message, user } = {} } = this.state;

    let verificationStatusType = false;

    if (status === 'error') {
      verificationStatusType = 'alert';
    }
    if (user) {
      verificationStatusType = 'success';
    }

    return (
      <Block className={styles.wrapper}>
        {isVerificationMessageOpen && (
          <Block>
            <Message type="success" size="big">
              {translations.signInVerificationLinkSent} {verificationPendingEmail}
            </Message>
          </Block>
        )}

        {verificationStatusType &&
          message && (
            <Block>
              <Message type={verificationStatusType} size="big">
                {message}
              </Message>
            </Block>
          )}

        <Block className={styles.fieldsWrapper}>
          <Block>
            <FormField
              name="username"
              id="email"
              component={InputText}
              type="email"
              placeholder={translations.placeholderEmailAddress}
              className={styles.formField}
              size="large"
            />
          </Block>
          <Block>
            <FormField
              name="password"
              id="password"
              component={InputText}
              type="password"
              placeholder={translations.placeholderPassword}
              className={styles.formField}
              size="large"
            />
          </Block>
        </Block>

        {!submitting &&
          submitSucceeded && (
            <Block>
              <Message type="success" className={styles.message} classNameText={styles.classNameText}>
                {translations.genericFormSuccess}
              </Message>
            </Block>
          )}
        {!submitting &&
          error && (
            <Block>
              <Message type="alert" className={styles.message} classNameText={styles.classNameText}>
                {error}
              </Message>
            </Block>
          )}

        <Block>
          <Button type="submit" className={styles.button} color="orange" size="big" submitting={submitting}>
            {translations.genericLogin}
          </Button>
        </Block>

        <Block className={styles.forgotPasswordWrapper}>
          <Block className={styles.signUpLink} onClick={this.onSignUpModalOpen}>
            {translations.genericDontHaveAccount}
          </Block>
          <Link href={appRoutes.account.forgotPassword} className={styles.forgotPasswordLink}>
            {translations.signInForgotPassword}
          </Link>
        </Block>

        <Modal isOpen={isSignUpOpen} size="big" onModalClose={this.onSignUpModalClose}>
          <ModalContainer title={translations.genericSignUpTitle}>
            <RegisterInfo />
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

SignInForm.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  loginUser: PropTypes.func.isRequired,
  clearVerificationPendingEmail: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  valid: PropTypes.bool,
  verificationPendingEmail: PropTypes.string,
  clearVerificationStatus: PropTypes.func.isRequired,
  verificationStatus: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }),
  translations: PropTypes.object.isRequired,
};

SignInForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
  verificationPendingEmail: null,
  verificationStatus: {},
};

const mapStateToProps = state => ({
  verificationPendingEmail: getVerificationPendingEmail(state),
  verificationStatus: getVerificationStatus(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  loginUser,
  clearVerificationPendingEmail,
  clearVerificationStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FormBuilder(props => ({
    form: 'SignInForm',
    className: styles.signInForm,
    onSubmit,
    validate: {
      password: {
        rules: {
          required: true,
          minLength: 6,
        },
        messages: {
          minLength: props.translations.messagePasswordTooShort,
        },
      },
      username: {
        rules: {
          required: true,
          format: 'email',
        },
        messages: {
          format: props.translations.messageInvalidEmail,
        },
      },
    },
  }))(SignInForm),
);
