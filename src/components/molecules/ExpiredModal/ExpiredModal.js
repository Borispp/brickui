import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';
import Link from 'components/atoms/Link';

import { getTranslations } from 'modules/systemData/selectors';

import styles from './ExpiredModal.scss';

class ExpiredModal extends React.PureComponent {
  render() {
    const { className, translations } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Heading type="h2" className={styles.headline}>
          {translations.expiredTitle}
        </Heading>

        <Block>
          Please contact:{' '}
          <Link href="mailto:support@brick-hrc.com" className={styles.link}>
            support@brick-hrc.com
          </Link>
        </Block>
      </Block>
    );
  }
}

ExpiredModal.propTypes = {
  translations: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ExpiredModal.defaultProps = {
  className: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default connect(mapStateToProps)(ExpiredModal);
