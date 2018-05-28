import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactSelect from 'react-select';

import InputErrorMessage from 'components/atoms/InputErrorMessage';

import get from 'lodash/get';

import Block from '../Block';

import styles from './SelectCustom.scss';

class SelectCustom extends PureComponent {
  onChange = option => {
    this.props.input.onChange(get(option, this.props.valueKey, null));
  };

  setSelectFocus = () => {
    requestAnimationFrame(() => {
      if (this.ref) {
        this.ref.focus();
      }
    });
  };

  withRef = ref => {
    this.ref = ref;
  };

  render() {
    const {
      options,
      className,
      labelStyle,
      searchable,
      label,
      disabled,
      openOnFocus,
      clearable,
      placeholder,
      valueKey,
      labelKey,
      input: { value },
      meta: { invalid, dirty, error, submitFailed },
      errorPosition,
      size,
      weight,
      noErrorMessage,
      ...props
    } = this.props;

    return (
      <Block
        className={classNames(styles.wrapper, styles[size], styles[weight], className, { [styles.disabled]: disabled })}
      >
        {label && <Block className={classNames(styles.label, styles[labelStyle])}>{label}</Block>}
        <ReactSelect
          isOpen
          placeholder={placeholder}
          searchable={searchable || false}
          {...props}
          value={value}
          valueKey={valueKey}
          labelKey={labelKey}
          autosize={false}
          openOnFocus={openOnFocus}
          clearable={clearable}
          autoBlur
          disabled={disabled}
          onChange={this.onChange}
          options={options}
          ref={this.withRef}
          className={classNames(styles.select, styles[size], styles[weight], {
            [styles.invalid]: (error && dirty) || (submitFailed && invalid),
          })}
        />
        {!noErrorMessage && (
          <InputErrorMessage
            className={classNames(styles.error, styles[errorPosition])}
            show={(error && dirty) || (submitFailed && invalid)}
          >
            {error}
          </InputErrorMessage>
        )}
      </Block>
    );
  }
}

SelectCustom.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool,
  openOnFocus: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.oneOf(['bold']),
  errorPosition: PropTypes.oneOf(['top']),
  size: PropTypes.oneOf(['small']),
  weight: PropTypes.oneOf(['bold']),
  noErrorMessage: PropTypes.bool,
};

SelectCustom.defaultProps = {
  meta: {},
  options: [],
  className: null,
  searchable: false,
  label: null,
  labelStyle: null,
  disabled: false,
  openOnFocus: false,
  clearable: false,
  placeholder: null,
  valueKey: 'value',
  labelKey: 'label',
  errorPosition: null,
  size: null,
  weight: null,
  noErrorMessage: false,
};

export default SelectCustom;
