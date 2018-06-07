import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';

import ModalContainer from 'components/molecules/ModalContainer';

import CompaniesList from 'components/organismes/CompaniesList';
import AddCompanyForm from 'components/organismes/AddCompanyForm';

import isGlobalAdmin from 'utils/isGlobalAdmin';

import { getTranslations } from 'modules/systemData/selectors';

import roles from 'utils/roleHelper';

import styles from './CompaniesListPage.scss';

class CompaniesListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isAddCompanyModalOpen: false,
    };
  }

  onAddCompanyModalOpen = () => this.setState({ isAddCompanyModalOpen: true });

  onAddCompanyModalClose = () => this.setState({ isAddCompanyModalOpen: false });

  render() {
    const { className, translations } = this.props;
    const { isAddCompanyModalOpen } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Helmet>
          <title>{translations.companiesPageTitle}</title>
        </Helmet>

        <Block>
          <Heading type="h1" className={styles.mainHeadline}>
            {translations.companiesListHeading}
          </Heading>
          <CompaniesList />
          <br />
          <br />
          <Block className={styles.submitWrapper}>
            <Button className={styles.button} size="medium" color="orange" onClick={this.onAddCompanyModalOpen}>
              {translations.companyAddButton}
            </Button>
          </Block>

          <Modal isOpen={isAddCompanyModalOpen} onModalClose={this.onAddCompanyModalClose}>
            <ModalContainer title={translations.companyAddButton} type="centred">
              <AddCompanyForm
                className="styles.addCompanyForm"
                roleName={roles.admin}
                onClose={this.onAddCompanyModalClose}
              />
            </ModalContainer>
          </Modal>
        </Block>
      </Block>
    );
  }
}

CompaniesListPage.propTypes = {
  className: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

CompaniesListPage.defaultProps = {
  className: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default isGlobalAdmin(connect(mapStateToProps)(CompaniesListPage));
