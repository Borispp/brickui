import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Text from 'components/atoms/Text';
import List from 'components/atoms/List';
import ListItem from 'components/atoms/ListItem';
import Link from 'components/atoms/Link';
import NavLink from 'components/atoms/NavLink';
// import Svg from 'components/atoms/Svg';

import appRoutes from 'routes/app';
import roles from 'utils/roleHelper';

import { getUserRole, getUserCompanyId } from 'modules/account/selectors';
import { signOut as signOutAction } from 'modules/account/actions';

import { withParams } from 'utils/url';

import { getTranslations } from 'modules/systemData/selectors';

import styles from './UserMenu.scss';

class UserMenu extends PureComponent {
  render() {
    const { className, type, signOut, roleName, companyId, translations } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <List className={classNames(styles.list, styles[type])}>
          {roleName === roles.globalAdmin && (
            <ListItem className={styles.item}>
              <NavLink href={appRoutes.dashboard.companiesList} activeClassName={styles.active} className={styles.link}>
                <Text className={classNames(styles.linkName)}>{translations.menuCompanies}</Text>
              </NavLink>
            </ListItem>
          )}
          {roleName === roles.admin && (
            <ListItem className={styles.item}>
              <NavLink
                href={withParams(appRoutes.dashboard.userList)}
                activeClassName={styles.active}
                className={styles.link}
              >
                <Text className={classNames(styles.linkName)}>{translations.menuUserList}</Text>
              </NavLink>
            </ListItem>
          )}
          {roleName === roles.admin && (
            <ListItem className={styles.item}>
              <NavLink
                href={withParams(appRoutes.dashboard.questionnairesList, { companyId })}
                activeClassName={styles.active}
                className={styles.link}
              >
                <Text className={classNames(styles.linkName)}>{translations.menuQuestionnaireList}</Text>
              </NavLink>
            </ListItem>
          )}
          {roleName === roles.admin && (
            <ListItem className={styles.item}>
              <NavLink
                href={withParams(appRoutes.dashboard.questionnaireAdd, { companyId })}
                activeClassName={styles.active}
                className={styles.link}
              >
                <Text className={classNames(styles.linkName)}>{translations.menuQuestionnaireAdd}</Text>
              </NavLink>
            </ListItem>
          )}

          <ListItem className={styles.item}>
            <Link href="/" onClick={signOut} className={styles.link}>
              <Text className={classNames(styles.linkName)}>{translations.menuLogout}</Text>
            </Link>
          </ListItem>
        </List>
      </Block>
    );
  }
}

UserMenu.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['sidebar']),
  signOut: PropTypes.func,
  roleName: PropTypes.string,
  companyId: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

UserMenu.defaultProps = {
  className: null,
  type: null,
  roleName: null,
  companyId: null,
  signOut: null,
};

const mapStateToProps = state => ({
  roleName: getUserRole(state),
  companyId: getUserCompanyId(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  signOut: signOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
