import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from 'components/atoms/Block';
import Label from 'components/atoms/Label';
import Svg from 'components/atoms/Svg';

import styles from './InputStar.scss';

class InputStar extends PureComponent {
  render() {
    const { className, input: { checked, onChange }, meta: { dirty, error }, withRef, id, ...props } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        <Label
          htmlFor={id}
          className={classNames(styles.label, {
            [styles.active]: !!checked,
            [styles.withError]: error && dirty,
          })}
        >
          <Svg type="star" className={classNames(styles.icon, { [styles.active]: !!checked })} />
          <input {...props} type="checkbox" ref={withRef} onChange={onChange} checked={checked} id={id} />
        </Label>
      </Block>
    );
  }
}

InputStar.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  withRef: PropTypes.func,
  input: PropTypes.shape({
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
  }),
};

InputStar.defaultProps = {
  id: null,
  className: null,
  withRef: null,
  meta: {},
};

export default InputStar;
