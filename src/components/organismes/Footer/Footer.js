import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import AllRightsReservedBlock from 'components/atoms/AllRightsReservedBlock';

import styles from './Footer.scss';

class Footer extends React.PureComponent {
  render() {
    const { className } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <AllRightsReservedBlock className={styles.allRightsReservedBlock} type="footer" />
      </Block>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: null,
};

export default Footer;
