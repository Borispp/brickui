import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// import classNames from 'classnames';
import { connect } from 'react-redux';

import FormBuilder from 'components/atoms/FormBuilder';
import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import Button from 'components/atoms/Button';
import Link from 'components/atoms/Link';
import InputText from 'components/atoms/InputText';
import Message from 'components/atoms/Message';
import { getTranslations } from 'modules/systemData/selectors';

import appRoutes from 'routes/app';

import { onSubmit } from './store/actions';

import styles from './ResetPasswordForm.scss';

class ResetPasswordForm extends React.PureComponent {
  resetForm = () => this.props.reset();

  render() {
    const { submitting, translations, submitSucceeded, error } = this.props;

    return (
      <Block className={styles.wrapper}>
        {!(!submitting && submitSucceeded) && (
          <Block className={styles.fieldsWrapper}>
            <FormField
              name="newPassword"
              id="newPassword"
              component={InputText}
              type="password"
              placeholder={translations.placeholderPassword}
              className={styles.formField}
              size="large"
            />

            {!(!submitting && submitSucceeded) && (
              <Block>
                <FormField
                  name="newPasswordConfirm"
                  id="newPasswordConfirm"
                  component={InputText}
                  type="password"
                  placeholder={translations.placeholderConfirmPassword}
                  className={styles.formField}
                  size="large"
                />
              </Block>
            )}
          </Block>
        )}
        {!submitting &&
          submitSucceeded && (
            <Block>
              <Message type="success" className={styles.message} classNameText={styles.classNameText}>
                {translations.signUpPasswordResetYouCanLogin}
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
              {translations.signUpPasswordReset}
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

ResetPasswordForm.propTypes = {
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  valid: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
      userId: PropTypes.string,
    }),
  }),
  translations: PropTypes.object.isRequired,
};

ResetPasswordForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
  match: {},
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default withRouter(
  connect(mapStateToProps)(
    FormBuilder(props => ({
      form: 'ResetPasswordForm',
      className: styles.resetPasswordForm,
      onSubmit,
      validate: {
        newPassword: {
          required: true,
          minLength: 6,
        },
        newPasswordConfirm: {
          rules: {
            required: true,
            matchToProperty: 'newPassword',
            minLength: 6,
          },
          messages: {
            matchToProperty: props.translations.messagePasswordNoMatch,
          },
        },
      },
    }))(ResetPasswordForm),
  ),
);
