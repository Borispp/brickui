import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Svg from 'components/atoms/Svg';
import Block from 'components/atoms/Block';
import Label from 'components/atoms/Label';
import InputErrorMessage from 'components/atoms/InputErrorMessage';

import styles from './InputText.scss';

class InputText extends PureComponent {
  render() {
    const {
      type,
      className,
      classNameWrapper,
      statusMessageClassName,
      labelClassName,
      size,
      input: { value, onChange, onBlur },
      meta: { invalid, dirty, touched, error, submitFailed },
      withRef,
      id,
      label,
      errorPosition,
      noErrorMessage,
      withIcon,
      submitSucceeded,
      statusMessage,
      ...props
    } = this.props;

    return (
      <Block className={classNames(styles.wrapper, classNameWrapper)}>
        <Block>
          {label && (
            <Label
              htmlFor={id}
              className={classNames(styles.label, labelClassName, styles[size], {
                [styles.active]: !!value,
                [styles.withError]: (error && dirty) || (error && touched),
              })}
            >
              {label}
            </Label>
          )}
          <input
            {...props}
            id={id}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            className={classNames(
              styles.input,
              styles[size],
              {
                [styles.invalid]: (error && touched) || (error && dirty) || (submitFailed && invalid),
              },
              className,
            )}
            ref={withRef}
          />

          {withIcon && (
            <Block className={classNames(styles.statusIconsWrapper, styles[errorPosition])}>
              {((error && dirty) || (submitFailed && invalid)) && (
                <Svg type="error" className={classNames(styles.statusIcon, styles.statusIconError)} />
              )}
              {submitSucceeded && (
                <Svg type="success" className={classNames(styles.statusIcon, styles.statusIconSuccess)} />
              )}
            </Block>
          )}

          {!noErrorMessage && (
            <InputErrorMessage
              className={classNames(styles.error, styles[errorPosition])}
              show={(error && touched) || (error && dirty) || (submitFailed && invalid)}
            >
              {error}
            </InputErrorMessage>
          )}

          {statusMessage &&
            !((error && dirty) || (error && touched) || (submitFailed && invalid)) && (
              <Block className={classNames(styles.statusMessage, styles[errorPosition], statusMessageClassName)}>
                {statusMessage}
              </Block>
            )}
        </Block>
      </Block>
    );
  }
}

InputText.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  classNameWrapper: PropTypes.string,
  statusMessageClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  withRef: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    touched: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
  }),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  errorPosition: PropTypes.oneOf(['top', 'topForSmall']),
  noErrorMessage: PropTypes.bool,
  withIcon: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  statusMessage: PropTypes.string,
};

InputText.defaultProps = {
  id: null,
  label: null,
  type: 'text',
  className: null,
  classNameWrapper: null,
  statusMessageClassName: null,
  labelClassName: null,
  withRef: null,
  size: null,
  meta: {},
  errorPosition: null,
  noErrorMessage: false,
  withIcon: false,
  submitSucceeded: false,
  statusMessage: null,
};

export default InputText;
