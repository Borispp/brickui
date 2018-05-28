import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Svg from 'components/atoms/Svg';
import Block from 'components/atoms/Block';
import Label from 'components/atoms/Label';
import InputErrorMessage from 'components/atoms/InputErrorMessage';

import styles from './Textarea.scss';

class Textarea extends PureComponent {
  render() {
    const {
      className,
      classNameWrapper,
      statusMessageClassName,
      labelClassName,
      size,
      input: { value, onChange },
      meta: { invalid, dirty, error, submitFailed },
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
                [styles.withError]: error && dirty,
              })}
            >
              {label}
            </Label>
          )}
          <textarea
            {...props}
            id={id}
            value={value}
            onChange={onChange}
            className={classNames(
              styles.input,
              styles[size],
              {
                [styles.invalid]: (error && dirty) || (submitFailed && invalid),
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
              show={(error && dirty) || (submitFailed && invalid)}
            >
              {error}
            </InputErrorMessage>
          )}

          {statusMessage &&
            !((error && dirty) || (submitFailed && invalid)) && (
              <Block className={classNames(styles.statusMessage, styles[errorPosition], statusMessageClassName)}>
                {statusMessage}
              </Block>
            )}
        </Block>
      </Block>
    );
  }
}

Textarea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  classNameWrapper: PropTypes.string,
  statusMessageClassName: PropTypes.string,
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  errorPosition: PropTypes.oneOf(['top', 'topForSmall']),
  noErrorMessage: PropTypes.bool,
  withIcon: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  statusMessage: PropTypes.string,
};

Textarea.defaultProps = {
  id: null,
  label: null,
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

export default Textarea;
