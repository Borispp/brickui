import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import FormBuilder from 'components/atoms/FormBuilder';
import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import Button from 'components/atoms/Button';
import Link from 'components/atoms/Link';
import InputText from 'components/atoms/InputText';
import Message from 'components/atoms/Message';

import appRoutes from 'routes/app';
import { getTranslations } from 'modules/systemData/selectors';

import { onSubmit } from './store/actions';

import styles from './ForgotPasswordForm.scss';

class ForgotPasswordForm extends React.PureComponent {
  resetForm = () => this.props.reset();

  render() {
    const { submitting, translations, submitSucceeded, error, formValues: { username } } = this.props;

    return (
      <Block className={styles.wrapper}>
        {!(!submitting && submitSucceeded) && (
          <Block className={styles.fieldsWrapper}>
            <FormField
              name="username"
              id="username"
              component={InputText}
              type="email"
              placeholder={translations.placeholderEmailAddress}
              className={styles.formField}
            />
          </Block>
        )}
        {!submitting &&
          submitSucceeded && (
            <Block>
              <Message type="success" className={styles.message} classNameText={styles.classNameText}>
                {translations.signUpCheckInbox} {username}
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
        {!(!submitting && submitSucceeded) && (
          <Block>
            <Button type="submit" className={styles.button} color="orange" size="big" submitting={submitting}>
              {translations.signUpSendReset}
            </Button>
          </Block>
        )}
        <Block className={styles.backToLoginWrapper}>
          <Link href={appRoutes.account.signIn} className={styles.link}>
            {translations.signUpBackToLogin}
          </Link>
        </Block>
      </Block>
    );
  }
}

ForgotPasswordForm.propTypes = {
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  valid: PropTypes.bool,
  formValues: PropTypes.shape({
    username: PropTypes.string,
  }),
  translations: PropTypes.object.isRequired,
};

ForgotPasswordForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
  formValues: {},
};
const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default connect(mapStateToProps)(
  FormBuilder(props => ({
    form: 'ForgotPasswordForm',
    className: styles.forgotPasswordForm,
    onSubmit,
    validate: {
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
  }))(ForgotPasswordForm),
);
