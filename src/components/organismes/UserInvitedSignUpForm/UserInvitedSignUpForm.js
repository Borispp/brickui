import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import appRoutes from 'routes/app';
import { Redirect } from 'react-router';
import FormBuilder from 'components/atoms/FormBuilder';
import FormField from 'components/atoms/FormField';
import CheckBox from 'components/atoms/CheckBox';
import Block from 'components/atoms/Block';
import Button from 'components/atoms/Button';
import InputText from 'components/atoms/InputText';
import Message from 'components/atoms/Message';
import { getTranslations } from 'modules/systemData/selectors';
import { signOut as signOutAction } from 'modules/account/actions';

import { onSubmit } from './store/actions';
import styles from './UserInvitedSignUpForm.scss';

class UserInvitedSignUpForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redirectToLogin: false,
    };
  }

  componentDidMount() {
    this.openTerms = new Event('openTerms');
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.submitting && nextProps.submitSucceeded) {
      setTimeout(() => {
        this.props.signOut();
        this.setState({ redirectToLogin: true });
      }, 3000);
    }
  }

  onOpenTerms = () => {
    document.dispatchEvent(this.openTerms);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { submitting, submitSucceeded, error, translations, company, valid } = this.props;

    return (
      <Block className={styles.wrapper}>
        {this.state.redirectToLogin && <Redirect to={appRoutes.account.signIn} />}

        <Block className={styles.fieldsWrapper}>
          <Block>
            <FormField
              name="email"
              id="email"
              component={InputText}
              type="email"
              placeholder="Email address"
              size="large"
              disabled
              className={styles.formField}
            />
          </Block>

          <Block>
            <FormField
              name="fullName"
              id="fullName"
              component={InputText}
              type="text"
              placeholder="Full name and position"
              size="large"
              className={styles.formField}
            />
          </Block>

          <Block>
            <FormField
              name="password"
              id="password"
              component={InputText}
              type="password"
              placeholder={translations.placeholderPassword}
              size="large"
              className={styles.formField}
            />
          </Block>

          <Block>
            <FormField
              name="passwordConfirm"
              id="passwordConfirm"
              component={InputText}
              type="password"
              placeholder={translations.placeholderRepeatPassword}
              size="large"
              className={styles.formField}
            />
          </Block>

          <Block className={styles.termsAcceptWrapper}>
            <FormField name="confirmTerms" id="confirmTerms" component={CheckBox}>
              {"I've read and accepted the"}
            </FormField>
            <Block className={styles.link} onClick={this.onOpenTerms}>
              Terms of use
            </Block>.
          </Block>
        </Block>

        {!submitting &&
          submitSucceeded && (
            <Block>
              <Message type="success" size="big" className={styles.message} classNameText={styles.classNameText}>
                {translations.formRegisterSuccess}, {translations.formRegisterRedirect}
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
            <Button
              type="submit"
              disabled={!valid}
              className={styles.button}
              color="orange"
              size="big"
              submitting={submitting}
            >
              Join YVBI platform
            </Button>
          </Block>
        )}
      </Block>
    );
  }
}

UserInvitedSignUpForm.propTypes = {
  error: PropTypes.string,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  company: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  fullName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  email: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  inviteId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  valid: PropTypes.bool,
  translations: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

UserInvitedSignUpForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  signOut: signOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FormBuilder(props => {
    const initialValues = {
      email: props.email,
      invitationToken: props.invitationToken,
      inviteId: props.inviteId,
      fullName: props.fullName,
    };
    return {
      form: 'UserInvitedSignUpForm',
      className: styles.userInvitedSignUpForm,
      onSubmit,
      initialValues,
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
        passwordConfirm: {
          rules: {
            required: true,
            matchToProperty: 'password',
            minLength: 6,
          },
          messages: {
            matchToProperty: props.translations.messagePasswordNoMatch,
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
        confirmTerms: {
          required: true,
        },
      },
    };
  })(UserInvitedSignUpForm),
);
