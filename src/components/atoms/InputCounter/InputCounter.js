import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from '../Block';
import InputText from '../InputText';
import Label from '../Label';
import Svg from '../Svg';

import styles from './InputCounter.scss';

class InputCounter extends PureComponent {
  onChange = ({ target: { value } }) => {
    const { max, disabled, input: { onChange } } = this.props;

    if (!disabled) {
      if (!value) {
        onChange(null);
      } else {
        const newValue = +value;

        onChange(newValue);

        // TODO: handle min and max input
        // if (min !== null && newValue < min) {
        //   onChange(min);
        // }

        if (max !== null && newValue > max) {
          onChange(max);
        }
      }
    }
  };

  onDecrease = () => {
    const { min, disabled, step, input: { value, onChange } } = this.props;

    if (!disabled) {
      const newValue = +value - step;

      if (min === null || newValue >= min) {
        onChange(newValue);
      }
    }
  };

  onIncrease = () => {
    const { max, disabled, step, input: { value, onChange } } = this.props;

    if (!disabled) {
      const newValue = +value + step;

      if (max === null || newValue <= max) {
        onChange(newValue);
      }
    }
  };

  render() {
    const {
      id,
      input: { value },
      input,
      meta: { error, dirty, submitFailed, invalid },
      meta,
      size,
      className,
      labelClassName,
      disabled,
      step,
      label,
    } = this.props;

    return (
      <Block className={classNames(className)}>
        {label && (
          <Label
            htmlFor={id}
            className={classNames(styles.label, labelClassName, styles[size], {
              [styles.active]: !!value,
              [styles.withError]: error && dirty,
            })}
          >
            {label}
          </Label>
        )}

        <Block
          className={classNames(
            styles.counter,
            styles[size],
            { [styles.invalid]: (error && dirty) || (submitFailed && invalid) },
            { [styles.disabled]: disabled },
          )}
        >
          <Block className={classNames(styles.controls, styles.controlDecrease)} onClick={this.onDecrease}>
            <Svg type="minus" className={styles.controlIcon} />
          </Block>

          <InputText
            id={id}
            type="number"
            input={{ ...input, onChange: this.onChange }}
            meta={size !== 'small' ? meta : {}}
            classNameWrapper={styles.inputWrapper}
            className={classNames(styles.input, styles[size])}
            disabled={disabled}
            step={step}
          />

          <Block className={classNames(styles.controls, styles.controlIncrease)} onClick={this.onIncrease}>
            <Svg type="plus" className={styles.controlIcon} />
          </Block>
        </Block>
      </Block>
    );
  }
}

InputCounter.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    form: PropTypes.string,
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
  }),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  size: PropTypes.oneOf(['small']),
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

InputCounter.defaultProps = {
  id: null,
  className: null,
  labelClassName: null,
  meta: {},
  min: null,
  max: null,
  step: 1,
  size: null,
  disabled: false,
  label: null,
};

export default InputCounter;
