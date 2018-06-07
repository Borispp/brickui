import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import FormBuilder from 'components/atoms/FormBuilder';
import FormField from 'components/atoms/FormField';
import Block from 'components/atoms/Block';
import Button from 'components/atoms/Button';
import Textarea from 'components/atoms/Textarea';
import Heading from 'components/atoms/Heading';
import RateField from 'components/atoms/RateField';
import Message from 'components/atoms/Message';

import { setNotificationSuccess } from 'modules/app/actions';

import { getTranslations } from 'modules/systemData/selectors';

import { onSubmit } from './store/actions';

import styles from './InterviewResultReviewForm.scss';

class InterviewResultReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSuccessed: false,
    };
  }

  componentWillReceiveProps = async nextProps => {
    if (!nextProps.submitting && nextProps.submitSucceeded && !this.state.isSuccessed) {
      this.setState(() => ({
        isSuccessed: true,
      }));

      this.props.setNotificationSuccess({ content: this.props.translations.genericSuccess });
      if (this.props.onClose) {
        setTimeout(() => this.props.onClose(), 600);
      }
    }
  };

  resetForm = () => this.props.reset();

  render() {
    const { submitting, translations, submitSucceeded, error } = this.props;

    return (
      <Block className={styles.wrapper}>
        <Heading type="h2" className={styles.mainHeadline}>
          {translations.interviewResultReviewFormHeading}
        </Heading>
        <Block className={styles.fieldsWrapper}>
          <Block>
            <FormField name="rate" id="rate" component={RateField} className={styles.formField} />
          </Block>

          <Block>
            <FormField
              name="review"
              id="review"
              component={Textarea}
              placeholder={translations.genericReview}
              className={classNames(styles.formField, styles.textArea)}
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
        <Block className={styles.submitWrapper}>
          <Button type="submit" size="medium" className={styles.button} color="orange" submitting={submitting}>
            {translations.genericSave}
          </Button>
        </Block>
      </Block>
    );
  }
}

InterviewResultReviewForm.propTypes = {
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
  companyId: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

InterviewResultReviewForm.defaultProps = {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FormBuilder(() => ({
    form: 'InterviewResultReviewForm',
    className: styles.interviewResultReviewForm,
    onSubmit,
    validate: {
      review: {
        required: true,
      },
      rate: {
        required: true,
      },
    },
  }))(InterviewResultReviewForm),
);
