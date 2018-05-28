import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactPhoneInput from 'react-phone-input-2';

import Block from 'components/atoms/Block';
import Label from 'components/atoms/Label';
import InputErrorMessage from 'components/atoms/InputErrorMessage';

import styles from './InputPhone.scss';

class InputPhone extends PureComponent {
  handleOnChange = (value, country) => {
    if (this.props.handleCountryInfo) {
      this.props.handleCountryInfo(country);
    }
    this.props.input.onChange(value);
  };

  render() {
    const {
      className,
      size,
      labelClassName,
      input: { value },
      meta: { invalid, dirty, error, submitFailed },
      withRef,
      id,
      label,
      errorPosition,
      noErrorMessage,
    } = this.props;

    return (
      <Block className={classNames(styles.wrapper, styles[size])}>
        <div>
          {label && (
            <Label
              htmlFor={id}
              className={classNames(className, styles.label, labelClassName, {
                [styles.active]: !!value,
                [styles.withError]: error && dirty,
              })}
            >
              {label}
            </Label>
          )}
          <ReactPhoneInput defaultCountry="us" onChange={this.handleOnChange} ref={withRef} />
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

InputPhone.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['large']),
  labelClassName: PropTypes.string,
  withRef: PropTypes.func,
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
  errorPosition: PropTypes.oneOf(['top']),
  noErrorMessage: PropTypes.bool,
  handleCountryInfo: PropTypes.func,
};

InputPhone.defaultProps = {
  id: null,
  label: null,
  className: null,
  size: null,
  labelClassName: null,
  withRef: null,
  meta: {},
  errorPosition: null,
  noErrorMessage: false,
  handleCountryInfo: null,
};

export default InputPhone;
