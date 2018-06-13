import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import Message from 'components/atoms/Message';
import Modal from 'components/atoms/Modal';
import Svg from 'components/atoms/Svg';
import WarningModal from 'components/atoms/WarningModal';

import ModalContainer from 'components/molecules/ModalContainer';

import InterviewQuestionsForm from 'components/organismes/InterviewQuestionsForm';
import InterviewUserInfoForm from 'components/organismes/InterviewUserInfoForm';
import InterviewResult from 'components/organismes/InterviewResult';

import { getInterview } from 'modules/interview/actions';
import { getInterview as getInterviewSelector, getQuestionnaire } from 'modules/interview/selectors';
import { getTranslations } from 'modules/systemData/selectors';

import { iOS, iOSversion, isSafari } from 'utils/validationHelpers';

import styles from './QuestionnaireInterviewPage.scss';

class QuestionnaireInterviewPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isUserInfoModalOpen: false,
      isIosBlocked: false,
    };
  }

  componentDidMount = async () => {
    const { match: { params: { tokenId } } } = this.props;
    await this.props.getInterview(tokenId);
    if (!this.props.interview.phone) {
      this.setState({ isUserInfoModalOpen: true });
    }

    const iOSversionNum = iOSversion();

    if ((iOS && iOSversionNum < 11) || (iOS && !isSafari)) {
      this.setState({
        isIosBlocked: true,
      });
    }
  };

  onUserInfoModalClose = () => this.setState({ isUserInfoModalOpen: false });

  render() {
    const { className, translations, questionnaire, interview, match } = this.props;
    const { error, isUserInfoModalOpen, isIosBlocked } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Helmet>
          <title>{translations.interviewTitle}</title>
        </Helmet>

        <Heading type="h1" className={styles.mainHeadline}>
          {translations.interviewTitle}
        </Heading>
        {error && (
          <Block>
            <Message type="alert" className={styles.message} classNameText={styles.classNameText}>
              {error}
            </Message>
          </Block>
        )}

        {questionnaire &&
          !interview.isSaved && (
            <InterviewQuestionsForm
              tokenId={match.params.tokenId}
              data={questionnaire}
              getInterview={this.props.getInterview}
            />
          )}

        {questionnaire && interview.isSaved && <InterviewResult questionnaire={questionnaire} interview={interview} />}

        {questionnaire &&
          interview.isSaved && (
            <Block className={styles.interviewSaved}>
              <Svg type="success" className={styles.successIcon} />
              {translations.interviewSavedSuccess}
            </Block>
          )}

        <Modal isOpen={!isIosBlocked && isUserInfoModalOpen} onModalClose={false}>
          <ModalContainer title={translations.interviewUserInfoTitle} type="centred">
            <InterviewUserInfoForm
              tokenId={interview.token}
              initialValues={{ userName: interview.userName, email: interview.email }}
              onClose={this.onUserInfoModalClose}
            />
          </ModalContainer>
        </Modal>

        <Modal isOpen={isIosBlocked} onModalClose={false} className={styles.modal}>
          <WarningModal>
            <Block className={styles.warningWrapper}>
              <Svg type="alert" className={styles.warningIcon} />
              {translations.iosWarning}
            </Block>
          </WarningModal>
        </Modal>
      </Block>
    );
  }
}

QuestionnaireInterviewPage.propTypes = {
  className: PropTypes.string,
  translations: PropTypes.object.isRequired,
  getInterview: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      tokenId: PropTypes.string,
      questionnaireId: PropTypes.string,
    }),
  }).isRequired,
  interview: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    questionnaire: PropTypes.string,
    userName: PropTypes.string,
    isSaved: PropTypes.bool,
  }),
  questionnaire: PropTypes.object,
};

QuestionnaireInterviewPage.defaultProps = {
  className: null,
  interview: {},
  questionnaire: {},
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
  interview: getInterviewSelector(state),
  questionnaire: getQuestionnaire(state),
});

const mapDispatchToProps = {
  getInterview,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireInterviewPage);
