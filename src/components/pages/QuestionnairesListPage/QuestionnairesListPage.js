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

import InviteUserList from 'components/organismes/InviteUserList';

import { getQuestionnaireList, questionnaireDelete } from 'modules/questionnaires/actions';
import { setNotificationSuccess, setNotificationError } from 'modules/app/actions';
import { getQuestionnaireList as getQuestionnaireListSelector } from 'modules/questionnaires/selectors';
import { getTranslations } from 'modules/systemData/selectors';

import { withParams } from 'utils/url';
import { interpolate } from 'utils/text';

import appRoutes from 'routes/app';

import styles from './QuestionnairesListPage.scss';

class QuestionnairesListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      questionnaireUserList: null,
    };
  }

  componentWillMount = async () => {
    const { status, message } = await this.props.getQuestionnaireList(get(this.props.match, 'params.companyId'));

    if (status === 'error') {
      this.setState({
        error: message,
      });
    }
  };

  onQuestionnaireUserListModalOpen = questionnaire => () => this.setState({ questionnaireUserList: questionnaire });

  onQuestionnaireUserListModalClose = () => this.setState({ questionnaireUserList: null });

  onQuestionnaireDelete = questionnaireId => async () => {
    const { status, message } = await this.props.questionnaireDelete(questionnaireId);
    if (status === 'error') {
      this.props.setNotificationError({ content: message });
      return;
    }

    await this.props.getQuestionnaireList(get(this.props.match, 'params.companyId'));
    this.props.setNotificationSuccess({ content: message });
  };

  render() {
    const { className, translations, questionnaireList, match: { params: { companyId } } } = this.props;
    const { error, questionnaireUserList } = this.state;

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
          {map(questionnaireList, ({ _id, title }) => (
            <Block key={_id} className={styles.questionnaireListItem}>
              <Link
                href={withParams(appRoutes.dashboard.questionnaireEdit, { companyId, questionnaireId: _id })}
                className={styles.questionnaireListName}
              >
                {title}
              </Link>

              <Block className={styles.questionnaireListControls}>
                <Block
                  onClick={this.onQuestionnaireUserListModalOpen({ _id, title })}
                  className={styles.controlButtonWrapper}
                >
                  <Svg type="invite" className={styles.controlButtonIcon} />
                  <Text className={styles.controlName}>{translations.usersSendInvitation}</Text>
                </Block>

                <Block
                  onClick={this.onQuestionnaireDelete(_id)}
                  className={classNames(styles.controlButtonWrapper, styles.delete)}
                >
                  <Svg type="close" className={styles.controlButtonIcon} />
                  <Text className={styles.controlName}>{translations.genericDelete}</Text>
                </Block>
              </Block>
            </Block>
          ))}
        </Block>

        {!error && (
          <Button color="orange" href={withParams(appRoutes.dashboard.questionnaireAdd, { companyId })}>
            {translations.questionnaireAddButton}
          </Button>
        )}

        <Modal isOpen={!!questionnaireUserList} onModalClose={this.onQuestionnaireUserListModalClose}>
          <ModalContainer
            title={interpolate(translations.companyUserList, {
              company: get(questionnaireUserList, 'title'),
            })}
          >
            {!!questionnaireUserList && (
              <InviteUserList
                companyId={this.props.match.params.companyId}
                questionnaireId={get(questionnaireUserList, '_id')}
              />
            )}
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

QuestionnairesListPage.propTypes = {
  className: PropTypes.string,
  getQuestionnaireList: PropTypes.func.isRequired,
  questionnaireDelete: PropTypes.func.isRequired,
  setNotificationSuccess: PropTypes.func.isRequired,
  setNotificationError: PropTypes.func.isRequired,
  questionnaireList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  translations: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.string,
      questionnaireId: PropTypes.string,
    }),
  }),
};

QuestionnairesListPage.defaultProps = {
  className: null,
  questionnaireList: [],
  match: {},
};

const mapStateToProps = state => ({
  questionnaireList: getQuestionnaireListSelector(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  getQuestionnaireList,
  questionnaireDelete,
  setNotificationSuccess,
  setNotificationError,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionnairesListPage));
