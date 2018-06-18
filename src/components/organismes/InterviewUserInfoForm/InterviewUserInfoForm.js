import React from 'react';
import PropTypes from 'prop-types';
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

import { setNotificationSuccess } from 'modules/app/actions';
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

  resetForm = () => this.props.reset();

  render() {
    const { submitting, translations, submitSucceeded, error, valid, companyName, participants } = this.props;

    return (
      <Block className={styles.wrapper}>
        <Block className={styles.fieldsWrapper}>
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
          <FormField name="confirmParticipants" id="confirmParticipants" component={CheckBox}>
            <Strong>{translations.genericDataReviewPersons}</Strong>
            <br />
            <List className={styles.participantsList}>
              {map(participants, ({ fullName, role }, i) => (
                <ListItem key={i}>
                  {fullName}
                  {'\u00A0'}
                  {role === 'USER' && '(HR)'}
                  {role === 'ADMIN' && '(Admin)'}
                </ListItem>
              ))}
              <ListItem>BRICK HUMAN RESOURCE CONSULTING (owner of YVBI)</ListItem>
            </List>
            and new HRs from <Strong>{companyName}</Strong>
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
      token: PropTypes.string,
      userId: PropTypes.string,
    }),
  }),
  setNotificationSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  tokenId: PropTypes.string,
  translations: PropTypes.object.isRequired,
  companyName: PropTypes.string,
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
  participants: [],
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  setNotificationSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FormBuilder(() => ({
    form: 'InterviewUserInfoForm',
    className: styles.interviewUserInfoForm,
    onSubmit,
    validate: {
      userName: {
        required: true,
      },
      phone: {
        rules: {
          required: true,
          pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        },
        messages: {
          pattern: 'Wrong phone format',
        },
      },
      email: {
        rules: {
          required: true,
          format: 'email',
        },
      },
      confirmParticipants: {
        required: true,
      },
    },
  }))(InterviewUserInfoForm),
);
