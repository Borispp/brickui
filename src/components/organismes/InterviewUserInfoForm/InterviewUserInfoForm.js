import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import map from 'lodash/map';

import FormBuilder from 'components/atoms/FormBuilder';
import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import List from 'components/atoms/List';
import ListItem from 'components/atoms/ListItem';
import Strong from 'components/atoms/Strong';
import Button from 'components/atoms/Button';
import InputText from 'components/atoms/InputText';
import CheckBox from 'components/atoms/CheckBox';
import Message from 'components/atoms/Message';
import UploadImage from 'components/atoms/UploadImage';

import { setNotificationSuccess } from 'modules/app/actions';
import { getInterview, editUserAvatar, removeUserAvatar } from 'modules/interview/actions';
import { getTranslations } from 'modules/systemData/selectors';

import { onSubmit } from './store/actions';

import styles from './InterviewUserInfoForm.scss';

class InterviewUserInfoForm extends React.PureComponent {
  componentWillReceiveProps = async nextProps => {
    if (!nextProps.submitting && nextProps.submitSucceeded) {
      this.resetForm();
      this.props.setNotificationSuccess({ content: this.props.translations.genericUpdateSuccess });
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  onAvatarUpload = () => avatar => this.props.editUserAvatar({ avatar, tokenId: this.props.tokenId });

  onAvatarRemove = async () => {
    await this.props.removeUserAvatar({ tokenId: this.props.tokenId });
    this.props.getInterview(this.props.tokenId);
  };

  resetForm = () => this.props.reset();

  render() {
    // eslint-disable-next-line no-unused-vars
    const { submitting, translations, submitSucceeded, error, valid, companyName, participants, avatar } = this.props;

    return (
      <Block className={styles.wrapper}>
        <Block className={styles.fieldsWrapper}>
          <Block className={styles.avatar}>
            <UploadImage
              name="avatar"
              src={avatar}
              onChange={this.onAvatarUpload('avatar')}
              onRemove={this.onAvatarRemove}
            />
          </Block>

          <Block>
            <FormField
              name="userName"
              id="userName"
              component={InputText}
              placeholder={translations.userName}
              className={styles.formField}
            />
          </Block>

          <Block>
            <FormField
              name="email"
              id="email"
              component={InputText}
              placeholder={translations.userEmail}
              className={styles.formField}
            />
          </Block>

          <Block>
            <FormField
              name="phone"
              id="phone"
              component={InputText}
              placeholder={translations.userPhone}
              className={styles.formField}
            />
          </Block>
        </Block>

        <Block className={styles.participants}>
          <Strong>
            Information to be provided when personal data is collected from the data subject according REGULATION (EU)
            2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 27 April 2016 on the protection of natural persons
            with regard to the processing of personal data and on the free movement of such data, and repealing
            Directive 95/46/EC (General Data Protection Regulation).
            <br />
            Your data will be viewed by representatives of the following parties:
          </Strong>
          <br />
          <br />
          <FormField name="confirmParticipants" id="confirmParticipants" component={CheckBox}>
            <Strong>Employer and the owner of the employment announcement:</Strong>
            <br />
            <List className={styles.participantsList}>
              {// eslint-disable-next-line no-unused-vars
              map(participants, ({ fullName, role }, i) => <ListItem key={i}>{fullName}</ListItem>)}
            </List>
            The recipients of the personal data: the controller, the employer and his employees, the controller service
            provider: Amazon Web Services (AWS): with servers in EU countries.
          </FormField>
          <br />
          <br />
          <FormField name="confirmAdmin" id="confirmAdmin" component={CheckBox}>
            <Strong>The controller and platform administrator:</Strong> SC Brick Human Resource Consulting SRL, owner of
            YVBI (yourview-beforeinterview.com).
            <br />
            - Contact details: www.brick-hrc.com and www.yourview-beforeinterview.com
            <br />
            - The purpose of the processing for which the personal data is intended: enable communication between the
            parts (Employer – its employees and Applicant – the candidate showing interest for the employment
            announcement);
            <br />
            - The legal basis for the processing: The controller is personal data operator registered at A.N.S.P.D.C.
            with 27126 number according to romanian law no.677/2001;
          </FormField>
          <br />
          <FormField name="confirmServer" id="confirmServer" component={CheckBox}>
            <Strong>For a fair and transparent processing is good to know that:</Strong>
            <br />
            - Your data will be permanently deleted by the platform administrator in the shortest period of time from
            the end of the recruitment project, no more than 90 days from registration. You will receive a confirmation
            email;
            <br />
            - You have the right to request access, rectification, portability or erasure of personal data or
            restriction of processing concerning the data subject;
            <br />
            - You have the right to lodge a complaint with a supervisory authority.
          </FormField>
        </Block>

        {!submitting &&
          submitSucceeded && (
            <Block>
              <Message type="success" className={styles.message} classNameText={styles.classNameText}>
                {translations.genericSuccess}
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
              size="medium"
              disabled={!valid}
              className={styles.button}
              color="orange"
              submitting={submitting}
            >
              {translations.genericSave}
            </Button>
          </Block>
        )}
      </Block>
    );
  }
}

InterviewUserInfoForm.propTypes = {
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  valid: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  match: PropTypes.shape({
    params: PropTypes.shape({
      tokenId: PropTypes.string,
      userId: PropTypes.string,
    }),
  }),
  setNotificationSuccess: PropTypes.func.isRequired,
  editUserAvatar: PropTypes.func.isRequired,
  removeUserAvatar: PropTypes.func.isRequired,
  getInterview: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  tokenId: PropTypes.string,
  translations: PropTypes.object.isRequired,
  companyName: PropTypes.string,
  avatar: PropTypes.string,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string,
      role: PropTypes.string,
    }),
  ),
};

InterviewUserInfoForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
  match: {},
  onClose: null,
  tokenId: null,
  companyName: null,
  avatar: null,
  participants: [],
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  setNotificationSuccess,
  editUserAvatar,
  removeUserAvatar,
  getInterview,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    FormBuilder(() => ({
      form: 'InterviewUserInfoForm',
      className: styles.interviewUserInfoForm,
      onSubmit,
      validate: {
        userName: {
          required: true,
        },
        // phone: {
        //   rules: {
        //     required: true,
        //     pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        //   },
        //   messages: {
        //     pattern: 'Wrong phone format',
        //   },
        // },
        email: {
          rules: {
            required: true,
            format: 'email',
          },
        },
        confirmParticipants: {
          required: true,
        },
        confirmAdmin: {
          required: true,
        },
        confirmServer: {
          required: true,
        },
      },
    }))(InterviewUserInfoForm),
  ),
);
