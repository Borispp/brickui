import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import Block from 'components/atoms/Block';
// import Heading from 'components/atoms/Heading';
// import Modal from 'components/atoms/Modal';
// import Button from 'components/atoms/Button';

// import ModalContainer from 'components/molecules/ModalContainer';

import UserList from 'components/organismes/UserList';

import isAdmin from 'utils/isAdmin';

import { getUserCompanyId } from 'modules/account/selectors';
import { getTranslations } from 'modules/systemData/selectors';

// import roles from 'utils/roleHelper';

import styles from './UserListPage.scss';

class UserListPage extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     isAddCompanyModalOpen: false,
  //   };
  // }

  // onAddCompanyModalOpen = () => this.setState({ isAddCompanyModalOpen: true });
  //
  // onAddCompanyModalClose = () => this.setState({ isAddCompanyModalOpen: false });

  render() {
    const { className, translations, companyId } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Helmet>
          <title>{translations.userListPageTitle}</title>
        </Helmet>

        <Block>{companyId && <UserList companyId={companyId} />}</Block>
      </Block>
    );
  }
}

UserListPage.propTypes = {
  className: PropTypes.string,
  companyId: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

UserListPage.defaultProps = {
  className: null,
  companyId: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
  companyId: getUserCompanyId(state),
});

export default isAdmin(connect(mapStateToProps)(UserListPage));
