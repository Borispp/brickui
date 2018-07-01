import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';

import styles from './RegisterInfo.scss';

const RegisterInfo = ({ className }) => (
  <Block className={classNames(styles.wrapper, className)}>
    <Block className={styles.paymentWrapper}>
      Please, contact our support for creating company account:{' '}
      <Link href="mailto:support@brick.ro" className={styles.link}>
        support@brick.ro
      </Link>
    </Block>
  </Block>
);

RegisterInfo.propTypes = {
  className: PropTypes.string,
};

RegisterInfo.defaultProps = {
  className: null,
};

export default RegisterInfo;
