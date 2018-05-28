import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Text from 'components/atoms/Text';
import Paragraph from 'components/atoms/Paragraph';
import Message from 'components/atoms/Message';

import ModalContainer from 'components/molecules/ModalContainer';

import { setNotificationSuccess, setNotificationError } from 'modules/app/actions';
import { getTranslations } from 'modules/systemData/selectors';

import { emailResend } from './store/actions';

import styles from './ResendEmailVerification.scss';

class ResendEmailVerification extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      verificationStatus: this.props.verificationStatus || {},
    };
  }

  resendEmail = async () => {
    try {
      const response = await this.props.emailResend();

      if (response.status === 'error') {
        this.props.setNotificationError({ content: response.message });
        return;
      }

      this.props.setNotificationSuccess({ content: `Verification link was sent to ${this.props.email}` });
    } catch (e) {
      this.props.setNotificationError({ content: e.message || 'Error' });
    }
  };

  render() {
    const { className, email, translations } = this.props;
    const { verificationStatus: { status, message, user } = {} } = this.state;

    let verificationStatusType = false;

    if (status === 'error') {
      verificationStatusType = 'alert';
    }
    if (user) {
      verificationStatusType = 'success';
    }

    return (
      <Block className={classNames(className, styles.wrapper)}>
        <ModalContainer title={translations.signUpAlmostThere}>
          <Block>
            <Block>
              {translations.signUpEmailSentTo} <Text className={styles.email}>{email}</Text>
            </Block>
            <Block>
              {verificationStatusType &&
                message && (
                  <Block className={styles.messageWrappper}>
                    <Message type={verificationStatusType} onClose={this.onVerificationStatusClose}>
                      {message}
                    </Message>
                  </Block>
                )}
            </Block>

            <Block className={classNames(styles.popupFooter)}>
              <Paragraph>
                <Text
                  className={classNames(styles.link)}
                  title={translations.signUpEmailResend}
                  onClick={this.resendEmail}
                >
                  {translations.signUpEmailResend}
                </Text>
              </Paragraph>
            </Block>
          </Block>
        </ModalContainer>
      </Block>
    );
  }
}

ResendEmailVerification.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  emailResend: PropTypes.func.isRequired,
  setNotificationSuccess: PropTypes.func.isRequired,
  setNotificationError: PropTypes.func.isRequired,
  verificationStatus: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }),
  translations: PropTypes.object.isRequired,
};

ResendEmailVerification.defaultProps = {
  className: null,
  email: null,
  verificationStatus: {},
};

const mapDispatchToProps = {
  emailResend,
  setNotificationSuccess,
  setNotificationError,
};
const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(ResendEmailVerification);
