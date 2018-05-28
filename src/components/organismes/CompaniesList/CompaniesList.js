import 'react-dates/initialize';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import get from 'lodash/get';
import classNames from 'classnames';
import moment from 'moment';

import Svg from 'components/atoms/Svg';
import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Strong from 'components/atoms/Strong';
import Text from 'components/atoms/Text';
import Paragraph from 'components/atoms/Paragraph';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import DatePicker from 'components/atoms/DatePicker';
import ModalContainer from 'components/molecules/ModalContainer';

import UserList from 'components/organismes/UserList';

import { setNotificationSuccess, setNotificationError } from 'modules/app/actions';
import { getCompaniesList, companyUpdateExpireDate, companyDelete } from 'modules/companies/actions';
import { getCompaniesList as getCompaniesListSelector } from 'modules/companies/selectors';
import { getTranslations } from 'modules/systemData/selectors';

import { withParams } from 'utils/url';

import appRoutes from 'routes/app';

import { interpolate } from 'utils/text';

import styles from './CompaniesList.scss';

class CompaniesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      companyToDelete: null,
      companyUserList: null,
      companyToChangeExpiration: null,
    };
  }

  componentDidMount() {
    this.props.getCompaniesList();
  }

  onCompanyDelete = async () => {
    await this.props.companyDelete(this.state.companyToDelete);
    this.setState({ companyToDelete: null });
    this.props.setNotificationSuccess({ content: this.props.translations.companyDeleteDescription });
  };

  onCompanyDeleteModalOpen = _id => () => this.setState({ companyToDelete: _id });

  onCompanyDeleteModalClose = () => this.setState({ companyToDelete: null });

  onCompanyUsersModalOpen = (_id, name) => () => this.setState({ companyUserList: { _id, name } });

  onCompanyUsersModalClose = () => this.setState({ companyUserList: null });

  onCompanyExpirationModalOpen = company => () => this.setState({ companyToChangeExpiration: { ...company } });

  onCompanyExpirationModalClose = () => this.setState({ companyToChangeExpiration: null });

  onExpireDateChange = date => {
    this.setState(() => ({
      companyToChangeExpiration: {
        ...this.state.companyToChangeExpiration,
        expiresAt: date,
      },
    }));
  };

  onExpireDateSave = async () => {
    if (get(this.state, 'companyToChangeExpiration.expiresAt')) {
      const { message, status } = await this.props.companyUpdateExpireDate({
        companyId: this.state.companyToChangeExpiration._id,
        expiresAt: get(this.state, 'companyToChangeExpiration.expiresAt').format(),
      });

      if (status === 'error') {
        this.props.setNotificationError({ content: message });
      } else {
        await this.props.getCompaniesList();
        this.onCompanyExpirationModalClose();
        this.props.setNotificationSuccess({ content: message });
      }
    }
  };

  render() {
    const { className, companiesList, translations } = this.props;
    const { companyToDelete, companyUserList, companyToChangeExpiration } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Block className={styles.companiesListWrapper}>
          {map(companiesList, ({ _id, name, expiresAt }) => (
            <Block key={_id} className={styles.companiesListItem}>
              <Link
                href={withParams(appRoutes.dashboard.questionnairesList, { companyId: _id })}
                className={styles.companyName}
              >
                {name}
              </Link>

              <Block
                onClick={this.onCompanyExpirationModalOpen({
                  _id,
                  name,
                  expiresAt: moment(expiresAt),
                })}
                className={styles.openExpireLink}
              >
                <Strong>Expire:</Strong> {moment(expiresAt).format('DD/MM/YYYY')}
              </Block>
              <Block onClick={this.onCompanyUsersModalOpen(_id, name)} className={styles.usersWrapper}>
                <Svg type="users" className={styles.usersIcon} />
                <Text className={styles.controlName}>Users</Text>
              </Block>

              <Block onClick={this.onCompanyDeleteModalOpen(_id)} className={styles.deleteWrapper}>
                <Svg type="close" className={styles.deleteIcon} />
                <Text className={styles.controlName}>Delete</Text>
              </Block>
            </Block>
          ))}
        </Block>

        {companyToChangeExpiration && (
          <Modal isOpen={!!companyToChangeExpiration} onModalClose={this.onCompanyExpirationModalClose} size="calendar">
            <ModalContainer
              title={`${translations.companySelectExpireDate} ${companyToChangeExpiration.name}`}
              className={styles.companyToChangeExpiration}
            >
              <DatePicker
                date={this.state.companyToChangeExpiration.expiresAt}
                onDateChange={this.onExpireDateChange}
                numberOfMonths={1}
                small
                focused
                onFocusChange={() => {}} // PropTypes.func.isRequired
                id={companyToChangeExpiration._id}
              />

              <Button color="orange" className={styles.expirationButtonSave} onClick={this.onExpireDateSave}>
                {translations.genericSave}
              </Button>
            </ModalContainer>
          </Modal>
        )}

        <Modal isOpen={!!companyToDelete} onModalClose={this.onCompanyDeleteModalClose}>
          <ModalContainer title={translations.companyConfirmDelete} type="centred">
            <Paragraph>{translations.companyConfirmDeleteDescription}</Paragraph>
            <Button color="red" size="medium" onClick={this.onCompanyDelete} className={styles.companyDeleteButton}>
              {translations.buttonDeleteCompany}
            </Button>
          </ModalContainer>
        </Modal>

        <Modal isOpen={!!companyUserList} onModalClose={this.onCompanyUsersModalClose}>
          <ModalContainer
            title={interpolate(translations.companyUserList, {
              company: get(companyUserList, 'name'),
            })}
          >
            {!!companyUserList && <UserList companyId={get(companyUserList, '_id')} />}
          </ModalContainer>
        </Modal>
      </Block>
    );
  }
}

CompaniesList.propTypes = {
  className: PropTypes.string,
  getCompaniesList: PropTypes.func.isRequired,
  companyUpdateExpireDate: PropTypes.func.isRequired,
  companyDelete: PropTypes.func.isRequired,
  setNotificationSuccess: PropTypes.func.isRequired,
  setNotificationError: PropTypes.func.isRequired,
  companiesList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      expiresAt: PropTypes.string,
    }),
  ),
  translations: PropTypes.object.isRequired,
};

CompaniesList.defaultProps = {
  className: null,
  companiesList: [],
};

const mapStateToProps = state => ({
  companiesList: getCompaniesListSelector(state),
  translations: getTranslations(state),
});

const mapDispatchToProps = {
  getCompaniesList,
  companyUpdateExpireDate,
  companyDelete,
  setNotificationSuccess,
  setNotificationError,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);
