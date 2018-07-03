import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Link from 'components/atoms/Link';
import Strong from 'components/atoms/Strong';

import styles from './RegisterInfo.scss';

const RegisterInfo = ({ className }) => (
  <Block className={classNames(styles.wrapper, className)}>
    <Block className={styles.paymentWrapper}>
      Write to the{' '}
      <Strong>
        <Link href="mailto:support@brick.ro" className={styles.link}>
          support@brick.ro
        </Link>
      </Strong>{' '}
      your name, surname, company name, your role, phone.
      <br />
      <br />
      After all this information has been saved, a unique code that will represent your application login user will be
      generated and will be available for 1 month. (For security reasons, this code cannot be recovered in case of
      losing, so please save it and keep it safe)
      <br />
      <br />
      Once logged, you can define the name of your recruitment project and start using the application.
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
