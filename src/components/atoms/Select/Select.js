import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';

import Block from 'components/atoms/Block';
import Label from 'components/atoms/Label';
import InputErrorMessage from 'components/atoms/InputErrorMessage';

import styles from './Select.scss';

class Select extends PureComponent {
  render() {
    const {
      className,
      labelClassName,
      size,
      input: { value, onChange },
      options,
      meta: { invalid, dirty, error, submitFailed },
      withRef,
      id,
      label,
      placeholder,
      errorPosition,
      noErrorMessage,
      ...props
    } = this.props;

    return (
      <Block className={styles.wrapper}>
        <div>
          {label && (
            <Label
              htmlFor={id}
              className={classNames(styles.label, labelClassName, {
                [styles.active]: !!value,
                [styles.withError]: error && dirty,
              })}
            >
              {label}
            </Label>
          )}
          <select
            {...props}
            id={id}
            value={value}
            onChange={onChange}
            className={classNames(
              styles.input,
              styles[size],
              {
                [styles.invalid]: (error && dirty) || (submitFailed && invalid),
                [styles.default]: value === '',
              },
              className,
            )}
            ref={withRef}
          >
            <option value="" disabled hidden={!placeholder} defaultValue className={styles.defaultOption}>
              {placeholder}
            </option>
            {map(options, (option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {!noErrorMessage && (
            <InputErrorMessage
              className={classNames(styles.error, styles[errorPosition])}
              show={(error && dirty) || (submitFailed && invalid)}
            >
              {error}
            </InputErrorMessage>
          )}
        </div>
      </Block>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['large']),
  labelClassName: PropTypes.string,
  withRef: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
  }),
  errorPosition: PropTypes.oneOf(['top']),
  noErrorMessage: PropTypes.bool,
};

Select.defaultProps = {
  id: null,
  label: null,
  placeholder: null,
  className: null,
  size: null,
  labelClassName: null,
  withRef: null,
  meta: {},
  errorPosition: null,
  noErrorMessage: false,
};

export default Select;
