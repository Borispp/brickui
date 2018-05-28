import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';

import QuestionarieForm from 'components/organismes/QuestionnaireForm';

import { getTranslations } from 'modules/systemData/selectors';

import styles from './QuestionnaireAddPage.scss';

class QuestionnaireAddPage extends React.PureComponent {
  render() {
    const { className, translations } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Helmet>
          <title>{translations.questionnaireAddTitle}</title>
        </Helmet>

        <Heading type="h1" className={styles.mainHeadline}>
          {translations.questionnaireAddTitle}
        </Heading>
        <QuestionarieForm />
      </Block>
    );
  }
}

QuestionnaireAddPage.propTypes = {
  className: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

QuestionnaireAddPage.defaultProps = {
  className: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default connect(mapStateToProps)(QuestionnaireAddPage);
