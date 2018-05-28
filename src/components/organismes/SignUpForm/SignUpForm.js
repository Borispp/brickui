import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import FormBuilder from 'components/atoms/FormBuilder';
import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import Text from 'components/atoms/Text';
import Link from 'components/atoms/Link';
import InputText from 'components/atoms/InputText';
import Message from 'components/atoms/Message';
import PasswordScore from 'components/atoms/PasswordScore';

import { updateVerificationPendingEmail } from 'modules/account/actions';
import { getTranslations } from 'modules/systemData/selectors';
import appRoutes from 'routes/app';

import { onSubmit } from './store/actions';
import styles from './SignUpForm.scss';

class SignUpForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redirectToLogin: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.submitting && nextProps.submitSucceeded) {
      this.props.updateVerificationPendingEmail(this.props.formValues.email);

      this.resetForm();

      this.setState({
        redirectToLogin: true,
      });
    }
  }

  resetForm = () => this.props.reset();

  render() {
    const { submitting, translations, submitSucceeded, error, formValues: { password } } = this.props;
    const { redirectToLogin } = this.state;

    return (
      <Block className={styles.wrapper}>
        {redirectToLogin && <Redirect to={appRoutes.account.signIn} />}

        <Block className="fields-full">
          <FormField
            name="fullName"
            id="fullName"
            component={InputText}
            type="text"
            placeholder={translations.placeholderFullName}
          />
        </Block>

        <Block className="fields-full">
          <FormField
            name="email"
            id="email"
            component={InputText}
            type="email"
            placeholder={translations.placeholderEmailAddress}
          />
        </Block>

        <Block className={classNames('fields-full', styles.passwordField)}>
          <FormField
            name="password"
            id="password"
            component={InputText}
            type="password"
            placeholder={translations.placeholderPassword}
            autoComplete="off"
          />
          <Block className="pass-wrapper">
            <Block className="pass-graybar">
              <Block className="pass-colorbar" style={{ backgroundPosition: '0px -46px', width: '46%' }} />
            </Block>
            <span className="pass-text">
              <PasswordScore password={password || ''} />
            </span>
          </Block>
        </Block>

        {!submitting &&
          submitSucceeded && (
            <Block className="fields-full fields-padd">
              <Message type="success" size="big">
                {translations.genericFormSuccess}
              </Message>
            </Block>
          )}
        {!submitting &&
          error && (
            <Block className="fields-full fields-padd">
              <Message type="alert" size="big">
                {error}
              </Message>
            </Block>
          )}

        <Block className="fields-full fields-padd">
          <button type="submit" className="button-blue">
            {translations.genericSignUp}
          </button>
        </Block>
        <Block className="fields form-links-bottom">
          <Link href={appRoutes.account.signIn} className="simplelink-blue">
            <Text>{translations.genericLogin}</Text>
          </Link>
        </Block>
      </Block>
    );
  }
}

SignUpForm.propTypes = {
  reset: PropTypes.func.isRequired,
  updateVerificationPendingEmail: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  valid: PropTypes.bool,
  formValues: PropTypes.shape({
    password: PropTypes.string,
    email: PropTypes.string,
  }),
  translations: PropTypes.object.isRequired,
};

SignUpForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
  formValues: {},
};

const mapDispatchToProps = {
  updateVerificationPendingEmail,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  FormBuilder(props => ({
    form: 'SignUpForm',
    className: styles.signUpForm,
    onSubmit,
    validate: {
      fullName: {
        required: true,
      },
      password: {
        rules: {
          required: true,
          minLength: 6,
        },
        messages: {
          minLength: props.translations.messagePasswordTooShort,
        },
      },
      email: {
        rules: {
          required: true,
          format: 'email',
        },
        messages: {
          format: props.translations.messageInvalidEmail,
        },
      },
    },
  }))(SignUpForm),
);
