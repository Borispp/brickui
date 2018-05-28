import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// import classNames from 'classnames';

import Block from 'components/atoms/Block';

import InterviewQuestionsForm from 'components/organismes/InterviewQuestionsForm';

import { getTranslations } from 'modules/systemData/selectors';

import isAuthenticated from 'utils/isAuthenticated';
import isVerified from 'utils/isVerified';

import styles from './DashboardPage.scss';

class DashboardPage extends PureComponent {
  render() {
    const { translations } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{translations.dashboardPageTitle}</title>
        </Helmet>
        <Block className={styles.wrapper}>
          <InterviewQuestionsForm />
        </Block>
      </React.Fragment>
    );
  }
}

DashboardPage.propTypes = {
  translations: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default isAuthenticated(isVerified(connect(mapStateToProps)(DashboardPage)));
