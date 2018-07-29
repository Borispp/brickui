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
import Strong from 'components/atoms/Strong';
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

          <Block className={styles.representatives}>
            <Strong>
              Information to be provided when personal data is collected from the data subject according REGULATION (EU)
              2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 27 April 2016 on the protection of natural
              persons with regard to the processing of personal data and on the free movement of such data, and
              repealing Directive 95/46/EC (General Data Protection Regulation).
              <br />
              <br />
              Your data will be viewed by representatives of the following parties:
            </Strong>

            <br />
            <br />
            <FormField name="confirmAdmin" id="confirmAdmin" component={CheckBox}>
              <Strong>The controller and platform administrator:</Strong> SC Brick Human Resource Consulting SRL, owner
              of YVBI (yourview-beforeinterview.com).
              <br />
              <br />
              - The controller representative: Ciprian Savin, Senior HR Consultant email: ciprian.savin@brick-hrc.com;
              <br />
              <br />
              - Contact details: www.brick-hrc.com and www.yourview-beforeinterview.com
              <br />
              <br />
              - The purpose of the processing for which the personal data is intended: enable communication between the
              parts (you, the Employer – your employees and Applicant – the candidate showing interest for your
              employment announcement);
              <br />
              <br />
              - The legal basis for the processing: The controller is personal data operator registered at A.N.S.P.D.C.
              with 27126 number according to romanian law no.677/2001;
              <br />
              <br />
              - The recipients of the personal data: the controller, you as an employer, your employees as users, your
              selected candidates, the controller service provider: Amazon Web Services (AWS): with servers in EU
              countries.
            </FormField>
          </Block>
          <br />

          <Block>
            <FormField name="confirmProcessing" id="confirmProcessing" component={CheckBox}>
              <Strong>For a fair and transparent processing is good to know that:</Strong>
              <br />
              <br />
              - Your selected candidates data will be permanently deleted by your representative or by the platform
              administrator in the shortest period of time from the end of the recruitment project, no more than 90 days
              from their registration;
              <br />
              <br />
              - Your selected candidates data will be permanently deleted by your representative or by the platform
              administrator in the shortest period of time from the end of the recruitment project, no more than 90 days
              from their registration;
              <br />
              <br />
              - You have the right to lodge a complaint with a supervisory authority.
            </FormField>
          </Block>
          <br />

          <Block>
            <FormField name="confirmErasure" id="confirmErasure" component={CheckBox}>
              Only in cases where the applicant requests the right to be erasure from the database, the application user
              will be informed by e-mail.
            </FormField>
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
        confirmAdmin: {
          required: true,
        },
        confirmProcessing: {
          required: true,
        },
        confirmErasure: {
          required: true,
        },
      },
    };
  })(UserInvitedSignUpForm),
);
