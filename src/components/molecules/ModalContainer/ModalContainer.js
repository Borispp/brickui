import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Heading from 'components/atoms/Heading';

import styles from './ModalContainer.scss';

class ModalContainer extends React.PureComponent {
  render() {
    const { children, className, title, type } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className, styles[type])}>
        <Block className={styles.header}>
          <Heading type="h3" className={styles.headline}>
            {title}
          </Heading>
        </Block>

        <Block className={styles.content}>{children}</Block>
      </Block>
    );
  }
}

ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['centred']),
};

ModalContainer.defaultProps = {
  className: null,
  title: null,
  type: null,
};

export default ModalContainer;
