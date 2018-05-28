import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormBuilder from 'components/atoms/FormBuilder';
import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import Button from 'components/atoms/Button';
import InputText from 'components/atoms/InputText';
import Message from 'components/atoms/Message';
import { getTranslations } from 'modules/systemData/selectors';

import { setNotificationSuccess } from 'modules/app/actions';
import { getCompanyUserList } from 'modules/companies/actions';

import roles from 'utils/roleHelper';

import { onSubmit } from './store/actions';

import styles from './InviteUserForm.scss';

class InviteUserForm extends React.PureComponent {
  componentWillReceiveProps = async nextProps => {
    if (!nextProps.submitting && nextProps.submitSucceeded) {
      this.resetForm();
      await this.props.getCompanyUserList(this.props.companyId);
      this.props.setNotificationSuccess({ content: this.props.translations.notificationInviteSendSuccess });
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  resetForm = () => this.props.reset();

  render() {
    const { submitting, translations, submitSucceeded, error } = this.props;

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
            <Button type="submit" size="medium" className={styles.button} color="orange" submitting={submitting}>
              {translations.usersInviteUser}
            </Button>
          </Block>
        )}
      </Block>
    );
  }
}

InviteUserForm.propTypes = {
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
  getCompanyUserList: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  companyId: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

InviteUserForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
  match: {},
  onClose: null,
  companyId: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  setNotificationSuccess,
  getCompanyUserList,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FormBuilder(props => ({
    form: 'InviteUserForm',
    className: styles.inviteUserForm,
    initialValues: {
      companyId: props.companyId,
      roleName: roles.user,
    },
    onSubmit,
    validate: {
      userName: {
        required: true,
      },
      email: {
        rules: {
          required: true,
          format: 'email',
        },
      },
    },
  }))(InviteUserForm),
);
