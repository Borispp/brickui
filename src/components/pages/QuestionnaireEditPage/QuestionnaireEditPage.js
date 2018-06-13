import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import Message from 'components/atoms/Message';

import QuestionnaireForm from 'components/organismes/QuestionnaireForm';

import { getQuestionnaireSingle, clearQuestionnaire } from 'modules/questionnaires/actions';
import { getQuestionnaire } from 'modules/questionnaires/selectors';
import { getTranslations } from 'modules/systemData/selectors';

import styles from './QuestionnaireEditPage.scss';

class QuestionnaireEditPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  componentDidMount = async () => {
    const { match: { params: { questionnaireId } } } = this.props;
    const { status, message } = await this.props.getQuestionnaireSingle(questionnaireId);

    if (status === 'error') {
      this.setState({
        error: message,
      });
    }
  };

  componentWillUnmount() {
    this.props.clearQuestionnaire();
  }

  render() {
    const { className, translations, questionnaire } = this.props;
    const { error } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Helmet>
          <title>{translations.questionnaireEditTitle}</title>
        </Helmet>

        <Heading type="h1" className={styles.mainHeadline}>
          {translations.questionnaireEditTitle}
        </Heading>
        {error && (
          <Block>
            <Message type="alert" className={styles.message} classNameText={styles.classNameText}>
              {error}
            </Message>
          </Block>
        )}

        {questionnaire && <QuestionnaireForm initialValues={questionnaire} />}
      </Block>
    );
  }
}

QuestionnaireEditPage.propTypes = {
  className: PropTypes.string,
  translations: PropTypes.object.isRequired,
  getQuestionnaireSingle: PropTypes.func.isRequired,
  clearQuestionnaire: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.string,
      questionnaireId: PropTypes.string,
    }),
  }).isRequired,
  questionnaire: PropTypes.object,
};

QuestionnaireEditPage.defaultProps = {
  className: null,
  questionnaire: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
  questionnaire: getQuestionnaire(state),
});

const mapDispatchToProps = {
  getQuestionnaireSingle,
  clearQuestionnaire,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEditPage);
