import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import Image from 'components/atoms/Image';
import Text from 'components/atoms/Text';
import Link from 'components/atoms/Link';
import AllRightsReservedBlock from 'components/atoms/AllRightsReservedBlock';
import Section from 'components/atoms/Section';
import Paragraph from 'components/atoms/Paragraph';
import { registerInvitedUser, signOut as signOutAction } from 'modules/account/actions';
import UserInvitedSignUpForm from 'components/organismes/UserInvitedSignUpForm';
import { getTranslations } from 'modules/systemData/selectors';

// import roles from 'utils/roleHelper';

import appRoutes from 'routes/app';
import logo from 'images/logo_y_big.png';
import getInvitedUserInfo from './store/actions';

import styles from './UserInvitedPage.scss';

class UserInvitedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      requestedBy: '',
      email: '',
      fullName: '',
      inviteId: '',
      token: '',
      showSuccessMessage: false,
      error: null,
      userNotFound: false,
    };
  }
  componentDidMount = async () => {
    const { match: { params: { inviteId, token } = {} } } = this.props;

    const response = await this.props.getInvitedUserInfo({
      inviteId,
      token,
    });

    if (response && response.email) {
      this.setState({ company: response.company, requestedBy: response.requestedBy, fullName: response.fullName });
      if (response.userExists) {
        const result = await this.props.registerInvitedUser({ inviteId, invitationToken: token });
        if (result.status === 'error') {
          this.setState({ error: result });
        } else {
          this.props.signOut();
          this.setState({ showSuccessMessage: true });
        }

        setTimeout(() => {
          this.props.history.push(appRoutes.account.signIn);
        }, 4000);
      } else {
        this.setState({ ...response, inviteId, token, userNotFound: true });
      }
    } else {
      this.props.history.push(appRoutes.account.signIn);
    }
  };

  render() {
    const {
      requestedBy,
      company,
      email,
      inviteId,
      token,
      showSuccessMessage,
      // eslint-disable-next-line no-unused-vars
      userNotFound,
      fullName,
      error,
    } = this.state;
    const { translations } = this.props;

    return (
      <Section className={styles.wrapper}>
        <Helmet>
          <title>{translations.inviteUserPageTitle}</title>
        </Helmet>
        <Block className={styles.contentWrapper}>
          <Block>
            <Link href="/">
              <Image src={logo} alt="Brick.ro" className={styles.logo} />
            </Link>
          </Block>
          <Block>
            <Block>
              <Block className={styles.headlineWrapper}>
                <Heading type="h2" className={styles.headline}>
                  {showSuccessMessage ? translations.genericJoined : translations.genericJoin}
                </Heading>
                <Paragraph className={styles.headlineDescription}>
                  {!showSuccessMessage &&
                    translations.translate('companyInvitedToJoin', { requestedBy, company: company.name })}
                </Paragraph>
              </Block>
              <Block>
                <Block className={styles.formWrapper}>
                  {showSuccessMessage && (
                    <Paragraph>
                      <Text className={classNames(styles.success)}>
                        {translations.translate('companyExistingUserAddSuccess', { companyKey: company.name })}
                      </Text>
                    </Paragraph>
                  )}
                  {error && (
                    <Paragraph>
                      <Text className={classNames(styles.error)}>{error.message}</Text>
                    </Paragraph>
                  )}
                  {email && (
                    <UserInvitedSignUpForm
                      fullName={fullName}
                      company={company}
                      email={email}
                      inviteId={inviteId}
                      invitationToken={token}
                    />
                  )}
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>

        <AllRightsReservedBlock className={styles.contacts} />
      </Section>
    );
  }
}

UserInvitedPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
      token: PropTypes.string,
    }),
  }),
  getInvitedUserInfo: PropTypes.func.isRequired,
  registerInvitedUser: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
  signOut: PropTypes.func,
};

UserInvitedPage.defaultProps = {
  history: {},
  match: {},
  signOut: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  getInvitedUserInfo,
  registerInvitedUser,
  signOut: signOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInvitedPage);
