import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import get from 'lodash/get';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Text from 'components/atoms/Text';
import Heading from 'components/atoms/Heading';
import Button from 'components/atoms/Button';
import Svg from 'components/atoms/Svg';
import Modal from 'components/atoms/Modal';

import ModalContainer from 'components/molecules/ModalContainer';

import InterviewInviteForm from 'components/organismes/InterviewInviteForm';

import { setNotificationSuccess, setNotificationError } from 'modules/app/actions';
import { getInterviewUserList, interviewDelete } from 'modules/interview/actions';
import { getInterviewUserPassedList, getInterviewUserIsntPassedList } from 'modules/interview/selectors';
import { getTranslations } from 'modules/systemData/selectors';
import { postRequest } from 'modules/api/actions';

import api from 'routes/api';
import app from 'routes/app';
import { withParams } from 'utils/url';

import styles from './InviteUserList.scss';

class InviteUserList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isInviteFormOpen: false,
    };
  }

  componentWillMount() {
    const { companyId, questionnaireId } = this.props;
    this.props.getInterviewUserList({ companyId, questionnaireId });
  }

  onInviteFormModalOpen = () => this.setState({ isInviteFormOpen: true });

  onInviteFormModalClose = () => this.setState({ isInviteFormOpen: false });

  onInterviewInviteDelete = tokenId => async () => {
    const { companyId, questionnaireId } = this.props;
    const { status, message } = await this.props.interviewDelete(tokenId);

    if (status === 'error') {
      this.props.setNotificationError({ content: message });
      return;
    }

    await this.props.getInterviewUserList({ companyId, questionnaireId });
    this.props.setNotificationSuccess({ content: message });
  };

  resendInvitation = ({ tokenId }) => async () => {
    const { status, message } = await postRequest(
      withParams(api.interview.resendEmail, { tokenId, companyId: this.props.companyId }),
    );

    if (status === 'error') {
      this.props.setNotificationError({ content: message });
      return;
    }

    this.props.setNotificationSuccess({ content: message });
  };

  render() {
    const { className, userListPassed, userListIsntPassed, translations, questionnaireId, companyId } = this.props;
    const { isInviteFormOpen } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Block className={styles.listWrapper}>
          <Heading type="h3" className={styles.listHeadline}>
            {translations.userListPassedInterviewHeadline}
          </Heading>
          <Block className={styles.list}>
            {map(userListPassed, user => (
              <Block className={styles.listWrapperItem} key={user._id}>
                <Block className={classNames(styles.listItemName)}>
                  {get(user, 'fullName')} ({get(user, 'email')})
                </Block>

                <Block className={styles.listItemRight}>
                  <Link
                    target="_blank"
                    href={withParams(app.interview.main, { questionnaireId, tokenId: user.token })}
                    className={classNames(styles.link, styles.controlButtonWrapper)}
                  >
                    <Svg type="link" className={styles.controlButtonIcon} />
                    <Text className={styles.controlName}>{translations.genericDirectLink}</Text>
                  </Link>
                </Block>
              </Block>
            ))}
          </Block>
          {userListPassed &&
            userListPassed.length === 0 && <Block className={styles.noUsers}>{translations.userInterviewedNone}</Block>}
        </Block>

        <Block className={styles.listWrapper}>
          <Heading type="h3" className={styles.listHeadline}>
            {translations.userListInterviewInvitedHeadline}
          </Heading>
          <Block className={styles.list}>
            {map(userListIsntPassed, user => (
              <Block className={styles.listWrapperItem} key={user._id}>
                <Block className={classNames(styles.listItemName)}>
                  {get(user, 'fullName')} ({get(user, 'email')})
                </Block>

                <Block className={styles.listItemRight}>
                  <Link
                    target="_blank"
                    href={withParams(app.interview.main, { questionnaireId, tokenId: user.token })}
                    className={classNames(styles.link, styles.controlButtonWrapper)}
                  >
                    <Svg type="link" className={styles.controlButtonIcon} />
                    <Text className={styles.controlName}>{translations.genericDirectLink}</Text>
                  </Link>
                  <Block
                    className={classNames(styles.link, styles.controlButtonWrapper)}
                    onClick={this.resendInvitation({ tokenId: user.token })}
                  >
                    <Svg type="resend" className={styles.controlButtonIcon} />
                    <Text className={styles.controlName}>{translations.resendInterviewInvitation}</Text>
                  </Block>
                  <Block
                    onClick={this.onInterviewInviteDelete(user.token)}
                    className={classNames(styles.controlButtonWrapper, styles.delete)}
                  >
                    <Svg type="close" className={styles.controlButtonIcon} />
                  </Block>
                </Block>
              </Block>
            ))}
          </Block>
          {userListIsntPassed &&
            userListIsntPassed.length === 0 && <Block className={styles.noUsers}>{translations.userInvitedNone}</Block>}
        </Block>

        <Button color="orange" size="medium" onClick={this.onInviteFormModalOpen}>
          {translations.usersInviteUser}
        </Button>

        <Modal isOpen={isInviteFormOpen} onModalClose={this.onInviteFormModalClose}>
          <ModalContainer title={translations.usersSendInvitationTitle} type="centred">
            <InterviewInviteForm
              onClose={this.onInviteFormModalClose}
              companyId={companyId}
              questionnaireId={questionnaireId}
            />
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

const userList = PropTypes.shape({
  _id: PropTypes.string,
  email: PropTypes.string,
  fullName: PropTypes.string,
  token: PropTypes.string,
  isSaved: PropTypes.bool,
});

InviteUserList.propTypes = {
  className: PropTypes.string,
  companyId: PropTypes.string.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  getInterviewUserList: PropTypes.func.isRequired,
  interviewDelete: PropTypes.func.isRequired,
  setNotificationSuccess: PropTypes.func.isRequired,
  setNotificationError: PropTypes.func.isRequired,
  userListPassed: PropTypes.arrayOf(userList),
  userListIsntPassed: PropTypes.arrayOf(userList),
  translations: PropTypes.object.isRequired,
};

InviteUserList.defaultProps = {
  className: null,
  userListPassed: [],
  userListIsntPassed: [],
};

const mapStateToProps = (state, props) => ({
  userListPassed: getInterviewUserPassedList(props.questionnaireId)(state),
  userListIsntPassed: getInterviewUserIsntPassedList(props.questionnaireId)(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  getInterviewUserList,
  interviewDelete,
  setNotificationSuccess,
  setNotificationError,
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteUserList);
