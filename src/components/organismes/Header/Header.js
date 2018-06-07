import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Strong from 'components/atoms/Strong';
import Text from 'components/atoms/Text';
import Header from 'components/atoms/Header';

import { signOut as signOutAction } from 'modules/account/actions';
import {
  getUserEmail,
  getUserCompanyName,
  getUserCompanyId,
  getUserCompanyExpireDate,
  getUserRole,
} from 'modules/account/selectors';
import { getTranslations } from 'modules/systemData/selectors';

import isAuthenticated from 'utils/isAuthenticated';
import isExpired from 'utils/isExpired';
import appRoutes from 'routes/app';
import { withParams } from 'utils/url';

import styles from './Header.scss';

// eslint-disable-next-line react/prefer-stateless-function
class HeaderComponent extends React.PureComponent {
  render() {
    const { userEmail, companyName, companyId, companyExpireDate, roleName, signOut, translations } = this.props;

    return (
      <Header className={styles.wrapper}>
        <Block className={styles.controls}>
          <Block className={styles.left}>
            <Link href={withParams(appRoutes.dashboard.questionnairesList, { companyId })} className={styles.logo} />
            <Block className={styles.userDataWrapper}>
              <Strong>
                {userEmail}, {roleName}
              </Strong>
              <Block className={styles.companyName}>
                {companyName && <Strong>{companyName}</Strong>}

                {companyExpireDate && (
                  <Text>
                    , &nbsp;
                    <Strong>{translations.genericExpires}: </Strong>
                    <Text>{moment(companyExpireDate).format('DD MMMM, YYYY')}</Text>
                  </Text>
                )}
              </Block>
            </Block>
          </Block>

          <Block className={styles.right}>
            <Strong onClick={signOut} className={styles.logout}>
              Logout
            </Strong>
          </Block>
        </Block>
      </Header>
    );
  }
}

HeaderComponent.propTypes = {
  userEmail: PropTypes.string,
  companyId: PropTypes.string,
  companyName: PropTypes.string,
  companyExpireDate: PropTypes.string,
  roleName: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
};
HeaderComponent.defaultProps = {
  userEmail: null,
  companyId: null,
  companyName: null,
  companyExpireDate: null,
  roleName: null,
};

const mapStateToProps = state => ({
  userEmail: getUserEmail(state),
  companyId: getUserCompanyId(state),
  companyName: getUserCompanyName(state),
  companyExpireDate: getUserCompanyExpireDate(state),
  roleName: getUserRole(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  signOut: signOutAction,
};

export default isAuthenticated(isExpired(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)));
