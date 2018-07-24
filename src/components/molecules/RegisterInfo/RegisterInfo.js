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
      For registration, send us by email at:{' '}
      <Strong>
        <Link href="mailto:register@yourview-beforeinterview.com" className={styles.link}>
          register@yourview-beforeinterview.com
        </Link>
      </Strong>{' '}
      your:
      <br />
      <br />
      - first name, surname & your role;
      <br />
      - work email address & work mobile phone
      <br />
      - <Strong>email subject</Strong>: YVBI trial for followed by your Employer’s name
      <br />
      <br />
      After all this information has been received, one of our users will sent you by provided email, the application
      “sign in” link where you can join YVBI platform.
      <br />
      <br />
      <Strong>Once logged in, you can name your recruitment projects and start using the application.</Strong>
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
