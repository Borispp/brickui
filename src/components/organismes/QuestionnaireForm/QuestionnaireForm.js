import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import { reduxForm, FieldArray } from 'redux-form';

import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import Form from 'components/atoms/Form';
import Heading from 'components/atoms/Heading';
import Button from 'components/atoms/Button';
import InputText from 'components/atoms/InputText';
import CheckBox from 'components/atoms/CheckBox';
import Textarea from 'components/atoms/Textarea';
import Svg from 'components/atoms/Svg';
import Text from 'components/atoms/Text';
import Message from 'components/atoms/Message';
import List from 'components/atoms/List';
import ListItem from 'components/atoms/ListItem';
import Strong from 'components/atoms/Strong';

import { getTranslations } from 'modules/systemData/selectors';
import { setNotificationSuccess } from 'modules/app/actions';
import { getCompanyParticipants } from 'modules/companies/actions';
import { getUserRole } from 'modules/account/selectors';

import { getCompanyParticipants as getCompanyParticipantsSelector } from 'modules/companies/selectors';

import { withParams } from 'utils/url';
import roles from 'utils/roleHelper';

import appRoutes from 'routes/app';

import { onSubmit } from './store/actions';

import styles from './QuestionnaireForm.scss';

// eslint-disable-next-line react/prop-types
const questionItem = ({ fields, question, index, translations }) => (
  <Block key={index} className={styles.fieldsArrayItem}>
    <Heading type="h4" className={styles.questionHeadline}>
      <Block>Your question #{index + 1}</Block>

      {index > 0 && (
        <Block onClick={() => fields.remove(index)} className={styles.deleteWrapper}>
          <Svg type="close" className={styles.deleteIcon} />
          <Text className={styles.controlName}>{translations.genericDelete}</Text>
        </Block>
      )}
    </Heading>
    <FormField
      name={`${question}.title`}
      id={`${question}${index}`}
      component={InputText}
      placeholder={translations.questionTitle}
      className={classNames(styles.formField, styles.questionTitle)}
    />
  </Block>
);

// eslint-disable-next-line react/prop-types
const renderQuestions = ({ fields, translations }) => (
  <Block className={styles.fieldsArrayWrapper}>
    <Block>{fields.map((question, index) => questionItem({ fields, question, index, translations }))}</Block>

    <Block className={styles.submitWrapper}>
      <Button type="button" color="transparent" onClick={() => fields.push({})}>
        {translations.questionAddButton}
      </Button>
    </Block>
  </Block>
);

class QuestionnaireForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redirectToQuestionnaireList: false,
      examplesView: false,
    };
  }

  componentDidMount = async () => {
    await this.props.getCompanyParticipants(this.props.match.params.companyId);
    this.resetForm();
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.submitting && nextProps.submitSucceeded) {
      // this.props.setNotificationSuccess({ content: this.props.translations.genericSuccess });
      setTimeout(() => this.setState({ redirectToQuestionnaireList: true }), 400);
    }
  }

  resetForm = () => this.props.reset();

  toggleExamplesView = () => this.setState(() => ({ examplesView: !this.state.examplesView }));

  render() {
    const {
      handleSubmit,
      submitting,
      translations,
      submitSucceeded,
      error,
      match: { params: { companyId } },
      companyParticipants,
    } = this.props;
    const { redirectToQuestionnaireList, examplesView } = this.state;

    return (
      <Form className={styles.wrapper} onSubmit={handleSubmit}>
        {redirectToQuestionnaireList && (
          <Redirect to={withParams(appRoutes.dashboard.questionnairesList, { companyId })} />
        )}

        {roles.user !== this.props.userRole && (
          <Block>
            <Heading type="h3" className={styles.subHeadline}>
              {translations.questionnaireAccessList}
              <Text className={styles.subHeadlineSmall}>
                * individually select each checkbox for those who take part in the selection process
              </Text>
            </Heading>

            <Block className={styles.participants}>
              {map(companyParticipants, ({ _id, fullName }) => (
                <FormField
                  key={_id}
                  name={`participants.${_id}`}
                  id={`participants.${_id}`}
                  component={CheckBox}
                  className={styles.participantsCheckboxField}
                >
                  {fullName}
                </FormField>
              ))}

              {companyParticipants &&
                companyParticipants.length === 0 && (
                  <Block className={styles.noUsers}>
                    There is no users in your company. Invite new users in <Strong>User List</Strong> page.
                  </Block>
                )}
            </Block>
          </Block>
        )}

        <Block className={styles.descriptionFieldsWrapper}>
          <Block className={styles.descriptionFields}>
            <Heading type="h2" className={styles.questionnaireDescriptionHeading}>
              {translations.questionnaireDescriptionTitleHeading}
            </Heading>
            <FormField
              name="title"
              id="title"
              component={InputText}
              placeholder={translations.questionnaireTitle}
              className={classNames(styles.formField)}
            />

            <Heading type="h2" className={styles.questionnaireDescriptionHeading}>
              {translations.questionnaireDescriptionHeading}
            </Heading>
            <FormField
              name="description"
              id="description"
              component={Textarea}
              placeholder={translations.questionnaireDescription}
              className={classNames(styles.formField)}
            />
          </Block>
        </Block>

        <Block className={styles.questionsWrapper}>
          <Block className={styles.questionsArray}>
            <FieldArray name="questions" component={renderQuestions} translations={translations} />
          </Block>

          <Block className={styles.questionsExamples}>
            <Heading type="h4" className={styles.questionHeadline} onClick={this.toggleExamplesView}>
              {translations.questionsExamples}
            </Heading>
            <List className={classNames(styles.questionsExamplesList, { [styles.examplesShow]: examplesView })}>
              <ListItem>
                <Strong>At this moment, how determined are you to make a career change</Strong>
                How should you answer: what are the criteria you will take into account when you consider changing your
                job
              </ListItem>
              <ListItem>
                <Strong>What are your expectations for the future employer / job?</Strong>
                How should you answer: what are the expectations that you have from the future employer, what kind of
                job you want, how that job should be, relations with the head / colleagues.
              </ListItem>
              <ListItem>
                <Strong>For how many employers have you worked in the last 10 years?</Strong>
                How should you answer: Specify the fields of activity and / or the names of the employers you worked for
                and the amount of time spent on them.
              </ListItem>
              <ListItem>
                <Strong>What are the main responsibilities and achievements you have made during this period?</Strong>
                How should you answer: make a concise synthesis of the main responsibilities and the main achievements.
              </ListItem>
              <ListItem>
                <Strong>What concerns (hobbies) do you have outside the time spent at work</Strong>
              </ListItem>
              <ListItem>
                <Strong>Is there any further information you want to submit? If yes, detail</Strong>
              </ListItem>
            </List>
          </Block>
        </Block>

        <Block className={styles.controlWrapper}>
          <Button type="submit" className={styles.button} color="orange" size="medium" submitting={submitting}>
            {translations.genericSave}
          </Button>
          <Block className={styles.formStatus}>
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
          </Block>
        </Block>
      </Form>
    );
  }
}

QuestionnaireForm.propTypes = {
  reset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getCompanyParticipants: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  valid: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.string,
      questionnaireId: PropTypes.string,
    }),
  }),
  // eslint-disable-next-line react/no-unused-prop-types
  setNotificationSuccess: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  companyParticipants: PropTypes.array,
  userRole: PropTypes.string,
};

QuestionnaireForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
  match: {},
  userRole: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
  companyParticipants: getCompanyParticipantsSelector(state),
  userRole: getUserRole(state),
});

const mapDispatchToProps = {
  setNotificationSuccess,
  getCompanyParticipants,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      destroyOnUnmount: true,
      enableReinitialize: true,
      form: 'QuestionnaireForm',
      className: styles.questionnaireForm,
      initialValues: {
        questions: [{}],
      },
      onSubmit,
      validate: values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        }
        if (!values.description) {
          errors.description = 'Required';
        }
        if (!values.questions || !values.questions.length) {
          errors.questions = { _error: 'At least one member must be entered' };
        } else {
          const questionsArrayErrors = [];
          forEach(values.questions, (question, index) => {
            const questionErrors = {};

            if (!question || !question.title) {
              questionErrors.title = 'Required';
              questionsArrayErrors[index] = questionErrors;
            }

            if (question && question.title && question.title.length > 120) {
              questionErrors.title = 'Maximum 120 characters allowed';
              questionsArrayErrors[index] = questionErrors;
            }

            // if (!question || !question.text) {
            //   questionErrors.text = 'Required';
            //   questionsArrayErrors[index] = questionErrors;
            // }
          });

          if (questionsArrayErrors.length) {
            errors.questions = questionsArrayErrors;
          }
        }

        return errors;
      },
    })(QuestionnaireForm),
  ),
);
