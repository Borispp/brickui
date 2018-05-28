import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactSelect from 'react-select';

import get from 'lodash/get';

import Block from '../Block';
import Strong from '../Strong';
import InputErrorMessage from '../InputErrorMessage';

import styles from './SelectExtraInfoCustom.scss';

const SelectValueRender = ({ children, value }) => (
  <Block className="Select-value">
    <Block className={classNames('Select-value-label', styles.selectValueOption)}>
      {children}
      <Block className={classNames(styles.selectInfo)}>
        {value.info && <Strong className={styles.selectInfoText}>{value.info}</Strong>}
      </Block>
    </Block>
  </Block>
);

class SelectValueOption extends PureComponent {
  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  };

  handleMouseEnter = event => {
    this.props.onFocus(this.props.option, event);
  };

  handleMouseMove = event => {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  };

  render() {
    const { children, option, className } = this.props;
    return (
      <Block
        className={classNames(className, styles.selectValueOption)}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
      >
        {children}
        <Block className={classNames(styles.selectInfo)}>
          {option.info && <Strong className={styles.selectInfoText}>{option.info}</Strong>}
        </Block>
      </Block>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class SelectExtraInfoCustom extends PureComponent {
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
          valueComponent={SelectValueRender}
          optionComponent={SelectValueOption}
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

SelectValueOption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  option: PropTypes.object.isRequired,
};

SelectValueOption.defaultProps = {
  children: null,
  className: null,
  isFocused: null,
  onFocus: null,
  onSelect: null,
};

SelectValueRender.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    info: PropTypes.string,
  }).isRequired,
};

SelectExtraInfoCustom.propTypes = {
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
      info: PropTypes.string,
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

SelectExtraInfoCustom.defaultProps = {
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

export default SelectExtraInfoCustom;
