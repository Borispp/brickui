import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import map from 'lodash/map';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Svg from 'components/atoms/Svg';
import Text from 'components/atoms/Text';
import Message from 'components/atoms/Message';
import Modal from 'components/atoms/Modal';

import ModalContainer from 'components/molecules/ModalContainer';

import InviteCandidatesList from 'components/organismes/InviteCandidatesList';
import InterviewInviteForm from 'components/organismes/InterviewInviteForm';

import { getQuestionnaireList, clearQuestionnaireList, questionnaireDelete } from 'modules/questionnaires/actions';
import { setNotificationSuccess, setNotificationError } from 'modules/app/actions';
import { getQuestionnaireList as getQuestionnaireListSelector } from 'modules/questionnaires/selectors';
import { getTranslations } from 'modules/systemData/selectors';
import { getUserRole } from 'modules/account/selectors';

import { withParams } from 'utils/url';
import { interpolate } from 'utils/text';
import roles from 'utils/roleHelper';

import appRoutes from 'routes/app';

import styles from './QuestionnairesListPage.scss';

class QuestionnairesListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      questionnaireUserList: null,
      questionnaire: null,
    };
  }

  componentDidMount = async () => {
    const { status, message } = await this.props.getQuestionnaireList(get(this.props.match, 'params.companyId'));

    if (status === 'error') {
      this.setState({
        error: message,
      });
    }
  };

  componentDidUpdate = async prevProps => {
    if (get(prevProps, 'match.params.companyId') !== get(this.props, 'match.params.companyId')) {
      const { status, message } = await this.props.getQuestionnaireList(get(this.props, 'match.params.companyId'));

      if (status === 'error') {
        this.setState({
          error: message,
        });
      }
    }
  };

  componentWillUnmount() {
    this.props.clearQuestionnaireList();
  }

  onInviteFormModalOpen = questionnaire => () => this.setState({ questionnaire });

  onInviteFormModalClose = () => this.setState({ questionnaire: null });

  onQuestionnaireUserListModalOpen = questionnaire => () => this.setState({ questionnaireUserList: questionnaire });

  onQuestionnaireUserListModalClose = () => this.setState({ questionnaireUserList: null });

  onQuestionnaireDelete = ({ _id, company }) => async () => {
    const { status, message } = await this.props.questionnaireDelete({ questionnaireId: _id, companyId: company });
    if (status === 'error') {
      this.props.setNotificationError({ content: message });
      return;
    }

    await this.props.getQuestionnaireList(get(this.props.match, 'params.companyId'));
    this.props.setNotificationSuccess({ content: message });
  };

  render() {
    const { className, translations, questionnaireList, userRole, match: { params: { companyId } } } = this.props;
    const { error, questionnaireUserList, questionnaire } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Helmet>
          <title>{translations.questionnairesListTitle}</title>
        </Helmet>

        <Heading type="h1" className={styles.mainHeadline}>
          {translations.questionnairesListTitle}
        </Heading>

        {error && (
          <Block>
            <Message type="alert" className={styles.message} classNameText={styles.classNameText}>
              {error}
            </Message>
          </Block>
        )}

        <Block className={styles.questionnaireListWrapper}>
          {map(questionnaireList, ({ _id, title, company }) => (
            <Block key={_id} className={styles.questionnaireListItem}>
              <Link
                href={withParams(appRoutes.dashboard.questionnaireEdit, { companyId, questionnaireId: _id })}
                className={styles.questionnaireListName}
              >
                {title}
              </Link>

              <Block className={styles.questionnaireListControls}>
                {[roles.globalAdmin, roles.admin].includes(userRole) && (
                  <Link
                    href={withParams(appRoutes.interview.allReviews, { companyId, questionnaireId: _id })}
                    className={styles.controlButtonWrapper}
                  >
                    <Svg type="feedback" className={styles.controlButtonIcon} />
                    <Text className={styles.controlName}>{translations.allInterviewers}</Text>
                  </Link>
                )}
                <Block
                  onClick={this.onInviteFormModalOpen({ _id, title, company })}
                  className={styles.controlButtonWrapper}
                >
                  <Svg type="invite" className={styles.controlButtonIcon} />
                  <Text className={styles.controlName}>{translations.interviewInviteCandidate}</Text>
                </Block>
                <Block
                  onClick={this.onQuestionnaireUserListModalOpen({ _id, title })}
                  className={styles.controlButtonWrapper}
                >
                  <Svg type="users" className={styles.controlButtonIcon} />
                  <Text className={styles.controlName}>{translations.candidateManagement}</Text>
                </Block>

                {[roles.globalAdmin, roles.admin].includes(userRole) && (
                  <Block
                    onClick={this.onQuestionnaireDelete({ _id, company })}
                    className={classNames(styles.controlButtonWrapper, styles.delete)}
                  >
                    <Svg type="close" className={styles.controlButtonIcon} />
                    <Text className={styles.controlName}>{translations.genericDelete}</Text>
                  </Block>
                )}
              </Block>
            </Block>
          ))}
        </Block>

        {!error && (
          <Block className={styles.submitWrapper}>
            <Button color="orange" size="medium" href={withParams(appRoutes.dashboard.questionnaireAdd, { companyId })}>
              {translations.questionnaireAddButton}
            </Button>
          </Block>
        )}

        <Modal isOpen={!!questionnaireUserList} onModalClose={this.onQuestionnaireUserListModalClose}>
          <ModalContainer
            title={interpolate(translations.questionnaireCandidatesList, {
              questionnaireName: get(questionnaireUserList, 'title'),
            })}
          >
            {!!questionnaireUserList && (
              <InviteCandidatesList
                companyId={this.props.match.params.companyId}
                questionnaireId={get(questionnaireUserList, '_id')}
                questionnaireName={get(questionnaireUserList, 'title')}
              />
            )}
          </ModalContainer>
        </Modal>

        {questionnaire && (
          <Modal isOpen={!!questionnaire} onModalClose={this.onInviteFormModalClose}>
            <ModalContainer
              title={
                questionnaire &&
                interpolate(translations.usersSendInvitationTitle, { questionnaireName: questionnaire.title })
              }
              type="centred"
            >
              <InterviewInviteForm
                onClose={this.onInviteFormModalClose}
                companyId={questionnaire.company}
                questionnaireId={questionnaire._id}
              />
            </ModalContainer>
          </Modal>
        )}
      </Block>
    );
  }
}

QuestionnairesListPage.propTypes = {
  className: PropTypes.string,
  getQuestionnaireList: PropTypes.func.isRequired,
  clearQuestionnaireList: PropTypes.func.isRequired,
  questionnaireDelete: PropTypes.func.isRequired,
  setNotificationSuccess: PropTypes.func.isRequired,
  setNotificationError: PropTypes.func.isRequired,
  questionnaireList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      company: PropTypes.string,
    }),
  ),
  translations: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.string,
      questionnaireId: PropTypes.string,
    }),
  }),
  userRole: PropTypes.string.isRequired,
};

QuestionnairesListPage.defaultProps = {
  className: null,
  questionnaireList: [],
  match: {},
};

const mapStateToProps = state => ({
  questionnaireList: getQuestionnaireListSelector(state),
  userRole: getUserRole(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  getQuestionnaireList,
  clearQuestionnaireList,
  questionnaireDelete,
  setNotificationSuccess,
  setNotificationError,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionnairesListPage));
