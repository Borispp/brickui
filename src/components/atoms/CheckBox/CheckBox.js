import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Label from '../Label';
import Block from '../Block';
import Text from '../Text';
import Svg from '../Svg';

import styles from './CheckBox.scss';

const CheckBox = ({ children, className, textClassName, id, input: { name, value, onChange }, ...props }) => (
  <Label htmlFor={id} className={classNames(styles.checkboxLabel, className)}>
    <input
      {...props}
      id={id}
      name={name}
      type="checkbox"
      checked={value}
      onChange={onChange}
      className={styles.checkboxInput}
    />

    <Block className={styles.labelBody}>
      <Svg type="success" className={styles.checkedIcon} />

      {children && <Text className={classNames(styles.checkboxText, textClassName)}>{children}</Text>}
    </Block>
  </Label>
);

CheckBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
  }).isRequired,
};

CheckBox.defaultProps = {
  children: null,
  className: null,
  textClassName: null,
  id: null,
};

export default CheckBox;
