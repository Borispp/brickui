import React from 'react';
import PropsTypes from 'prop-types';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import Block from '../Block';
import Text from '../Text';
import Svg from '../Svg';

import styles from './Modal.scss';

const Modal = ({ className, isOpen, children, onModalClose, size, ...props }) => (
  <ReactModal
    {...props}
    isOpen={isOpen}
    onRequestClose={onModalClose || null}
    className={classNames(className, styles.modal, styles[size])}
    ariaHideApp={false}
  >
    {onModalClose && (
      <Text onClick={onModalClose} className={styles.modalClose}>
        <Svg type="close" />
      </Text>
    )}
    <Block className={styles.modalBody}>{children}</Block>
  </ReactModal>
);

Modal.propTypes = {
  className: PropsTypes.string,
  isOpen: PropsTypes.bool.isRequired,
  children: PropsTypes.node.isRequired,
  size: PropsTypes.oneOf(['calendar', 'small', 'big']),
  onModalClose: PropsTypes.oneOfType([PropsTypes.func, PropsTypes.bool]).isRequired,
};

Modal.defaultProps = {
  className: null,
  size: null,
};

export default Modal;
