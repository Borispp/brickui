import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';

import styles from './WarningModal.scss';

class WarningModal extends React.PureComponent {
  render() {
    const { children, className } = this.props;

    return <Block className={classNames(styles.wrapper, className)}>{children}</Block>;
  }
}

WarningModal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

WarningModal.defaultProps = {
  className: null,
};

export default WarningModal;
