import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';
import { reduxForm, FieldArray } from 'redux-form';

import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import Form from 'components/atoms/Form';
import Heading from 'components/atoms/Heading';
import Button from 'components/atoms/Button';
import InputText from 'components/atoms/InputText';
import Textarea from 'components/atoms/Textarea';
import Svg from 'components/atoms/Svg';
import Text from 'components/atoms/Text';
import Message from 'components/atoms/Message';

import { getTranslations } from 'modules/systemData/selectors';
import { setNotificationSuccess } from 'modules/app/actions';

import { withParams } from 'utils/url';

import appRoutes from 'routes/app';

import { onSubmit } from './store/actions';

import styles from './QuestionnaireForm.scss';

// eslint-disable-next-line react/prop-types
const questionItem = ({ fields, question, index, translations }) => (
  <Block key={index} className={styles.fieldsArrayItem}>
    <Heading type="h4" className={styles.questionHeadline}>
      <Block>Question #{index + 1}</Block>

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
    <FormField
      name={`${question}.text`}
      id={`${question}${index}`}
      component={Textarea}
      placeholder={translations.questionText}
      className={classNames(styles.formField, styles.questionText)}
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
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.submitting && nextProps.submitSucceeded) {
      // this.props.setNotificationSuccess({ content: this.props.translations.genericSuccess });
      setTimeout(() => this.setState({ redirectToQuestionnaireList: true }), 400);
    }
  }

  resetForm = () => this.props.reset();

  render() {
    const {
      handleSubmit,
      submitting,
      translations,
      submitSucceeded,
      error,
      match: { params: { companyId } },
    } = this.props;
    const { redirectToQuestionnaireList } = this.state;

    return (
      <Form className={styles.wrapper} onSubmit={handleSubmit}>
        {redirectToQuestionnaireList && (
          <Redirect to={withParams(appRoutes.dashboard.questionnairesList, { companyId })} />
        )}

        <Block className={styles.descriptionFieldsWrapper}>
          <Heading type="h2" className={styles.questionnaireDescriptionHeading}>
            {translations.questionnaireDescriptionHeading}
          </Heading>

          <Block className={styles.descriptionFields}>
            <FormField
              name="title"
              id="title"
              component={InputText}
              placeholder={translations.questionnaireTitle}
              className={classNames(styles.formField)}
            />
            <FormField
              name="description"
              id="description"
              component={Textarea}
              placeholder={translations.questionnaireDescription}
              className={classNames(styles.formField)}
            />
          </Block>
        </Block>

        <FieldArray name="questions" component={renderQuestions} translations={translations} />
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
};

QuestionnaireForm.defaultProps = {
  error: null,
  submitting: null,
  submitSucceeded: null,
  valid: false,
  match: {},
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  setNotificationSuccess,
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

            if (question && question.title && question.title.length > 60) {
              questionErrors.title = 'Maximum 60 characters allowed';
              questionsArrayErrors[index] = questionErrors;
            }

            if (!question || !question.text) {
              questionErrors.text = 'Required';
              questionsArrayErrors[index] = questionErrors;
            }
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
