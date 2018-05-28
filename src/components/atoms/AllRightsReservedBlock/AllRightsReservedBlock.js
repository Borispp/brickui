import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';

import { getTranslations } from 'modules/systemData/selectors';

import styles from './AllRightsReservedBlock.scss';

class AllRightsReservedBlock extends React.PureComponent {
  render() {
    const { translations, className } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Block className={styles.copyright}>
          {`©${new Date().getFullYear()}`} {translations.genericAllRightsReserved}
        </Block>
        <Block>
          <Link href="#" className={styles.link}>
            {translations.genericTermsOfService}
          </Link>
          <Link href="#" className={styles.link}>
            {translations.genericPrivacyPolicy}
          </Link>
        </Block>
      </Block>
    );
  }
}

AllRightsReservedBlock.propTypes = {
  className: PropTypes.string,
  translations: PropTypes.object.isRequired,
};

AllRightsReservedBlock.defaultProps = {
  className: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});
export default connect(mapStateToProps)(AllRightsReservedBlock);
