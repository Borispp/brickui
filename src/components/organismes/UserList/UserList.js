import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import get from 'lodash/get';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Text from 'components/atoms/Text';
import Strong from 'components/atoms/Strong';
import Heading from 'components/atoms/Heading';
import Button from 'components/atoms/Button';
import Svg from 'components/atoms/Svg';
import Modal from 'components/atoms/Modal';

import ModalContainer from 'components/molecules/ModalContainer';

import InviteUserForm from 'components/organismes/InviteUserForm';

import { setNotificationSuccess, setNotificationError } from 'modules/app/actions';
import { getCompanyUserList } from 'modules/companies/actions';
import { userDelete, inviteDelete } from 'modules/users/actions';
import { getCompanyUserList as getCompanyUserListSelector } from 'modules/companies/selectors';
import { getTranslations } from 'modules/systemData/selectors';

import roles from 'utils/roleHelper';

import app from 'routes/app';
import { withParams } from 'utils/url';

import styles from './UserList.scss';

class UserList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isInviteFormOpen: false,
    };
  }

  componentDidMount() {
    this.props.getCompanyUserList(this.props.companyId);
  }

  onInviteFormModalOpen = () => this.setState({ isInviteFormOpen: true });

  onInviteFormModalClose = () => this.setState({ isInviteFormOpen: false });

  onUserDelete = _id => async () => {
    const { status, message } = await this.props.userDelete(_id);

    if (status === 'error') {
      this.props.setNotificationError({ content: message });
      return;
    }

    await this.props.getCompanyUserList(this.props.companyId);
    this.props.setNotificationSuccess({ content: message });
  };

  onInviteDelete = _id => async () => {
    const { status, message } = await this.props.inviteDelete(_id);

    if (status === 'error') {
      this.props.setNotificationError({ content: message });
      return;
    }

    await this.props.getCompanyUserList(this.props.companyId);
    this.props.setNotificationSuccess({ content: message });
  };

  render() {
    const { className, userList, translations, companyId } = this.props;
    const { isInviteFormOpen } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Block className={styles.listWrapper}>
          <Heading type="h3" className={styles.listHeadline}>
            {translations.userListHeadline}
          </Heading>
          <Block className={styles.list}>
            {map(get(userList, 'users'), user => (
              <Block
                className={classNames(styles.listWrapperItem, {
                  [styles.isAdmin]: [roles.admin, roles.globalAdmin].includes(get(user, 'local.role.name')),
                })}
                key={user._id}
              >
                <Block className={classNames(styles.listItemName)}>
                  {get(user, 'local.fullName')} ({get(user, 'local.email')})
                </Block>

                <Block className={styles.listItemRight}>
                  {get(user, 'local.role.name') === roles.admin && (
                    <Text className={styles.userRole}>{roles.admin}</Text>
                  )}
                  {![roles.admin, roles.globalAdmin].includes(get(user, 'local.role.name')) && (
                    <Block onClick={this.onUserDelete(user._id)} className={styles.deleteWrapper}>
                      <Svg type="close" className={styles.deleteIcon} />
                    </Block>
                  )}
                </Block>
              </Block>
            ))}
          </Block>
          {get(userList, 'users') &&
            get(userList, 'users').length === 0 && (
              <Block className={styles.noUsers}>{translations.userInvitedNone}</Block>
            )}
        </Block>

        <Block className={styles.listWrapper}>
          <Heading type="h3" className={styles.listHeadline}>
            {translations.userInvitedListHeadline}
          </Heading>
          <Block className={styles.list}>
            {map(get(userList, 'invites'), invite => (
              <Block className={styles.listWrapperItem} key={invite._id}>
                <Block className={styles.listItemName}>
                  <Text className={styles.dateText}>{invite.Created_date}</Text>
                  <Strong>
                    {invite.fullName} ({invite.email})
                  </Strong>
                </Block>

                <Block className={styles.listItemRight}>
                  <Link
                    target="_blank"
                    href={withParams(app.account.invitedUser, {
                      inviteId: invite._id,
                      token: invite.verificationToken,
                    })}
                    className={classNames(styles.link, styles.controlButtonWrapper)}
                  >
                    <Svg type="link" className={styles.controlButtonIcon} />
                    <Text className={styles.controlName}>{translations.genericRegisterLink}</Text>
                  </Link>
                  {!(get(invite, 'role.name') === roles.admin) && (
                    <Block onClick={this.onInviteDelete(invite._id)} className={styles.deleteWrapper}>
                      <Svg type="close" className={styles.deleteIcon} />
                    </Block>
                  )}
                </Block>
              </Block>
            ))}
          </Block>
          {get(userList, 'invites') &&
            get(userList, 'invites').length === 0 && (
              <Block className={styles.noUsers}>{translations.userInvitedNone}</Block>
            )}
        </Block>

        <Block className={styles.controlWrapper}>
          <Button color="orange" size="medium" onClick={this.onInviteFormModalOpen}>
            {translations.usersInviteUser}
          </Button>
        </Block>

        <Block className={styles.listDescription}>
          Invite your colleagues to vote and share the candidate recorded message with all the involved parts
          (recruitment team, Hiring Manager, an so on).
          <br />
          Grade it individually and score it together based on the average score.
          <br />
          Take a collective decision & select th right ones for face to face interviews
        </Block>

        <Modal isOpen={isInviteFormOpen} size="small" onModalClose={this.onInviteFormModalClose}>
          <ModalContainer title={translations.usersInviteUser} type="centred">
            <InviteUserForm companyId={companyId} />
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  companyId: PropTypes.string.isRequired,
  getCompanyUserList: PropTypes.func.isRequired,
  userDelete: PropTypes.func.isRequired,
  inviteDelete: PropTypes.func.isRequired,
  setNotificationSuccess: PropTypes.func.isRequired,
  setNotificationError: PropTypes.func.isRequired,
  userList: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        local: PropTypes.shape({
          email: PropTypes.string,
          fullName: PropTypes.string,
        }),
      }),
    ),
    invites: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string,
        fullName: PropTypes.string,
        verificationTokenExpiresAt: PropTypes.string,
        Created_date: PropTypes.string,
      }),
    ),
  }),
  translations: PropTypes.object.isRequired,
};

UserList.defaultProps = {
  className: null,
  userList: {},
};

const mapStateToProps = (state, props) => ({
  userList: getCompanyUserListSelector(props.companyId)(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  getCompanyUserList,
  userDelete,
  inviteDelete,
  setNotificationSuccess,
  setNotificationError,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
