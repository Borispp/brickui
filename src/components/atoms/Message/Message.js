import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Text from 'components/atoms/Text';
import Svg from 'components/atoms/Svg';

import styles from './Message.scss';

class Message extends React.PureComponent {
  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { children, className, classNameText, type, size, kind, centred } = this.props;

    return (
      <Block
        className={classNames(
          styles.wrapper,
          styles[type],
          styles[size],
          styles[kind],
          { [styles.centred]: centred },
          className,
        )}
      >
        <Text className={styles.iconMsg}>
          <Svg type={type} className={styles.icon} />
        </Text>
        <Text className={classNames(styles.text, classNameText)}>{children}</Text>
        {this.props.onClose && (
          <Block className={classNames(styles.close)} onClick={this.onClose}>
            <Svg type="close" className={classNames(styles.iconClose)} />
          </Block>
        )}
      </Block>
    );
  }
}

Message.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classNameText: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['success', 'alert']).isRequired,
  size: PropTypes.oneOf(['medium', 'big']),
  kind: PropTypes.oneOf(['square']),
  centred: PropTypes.bool,
};

Message.defaultProps = {
  className: null,
  classNameText: null,
  onClose: null,
  size: null,
  kind: null,
  centred: false,
};

export default Message;
