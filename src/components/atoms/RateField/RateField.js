import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { getTranslations } from 'modules/systemData/selectors';

import Block from '../Block';
import Svg from '../Svg';
import styles from './RateField.scss';

class RateField extends PureComponent {
  onChange = value => () => {
    const { input: { onChange } } = this.props;
    onChange(value);
  };

  render() {
    const {
      input: { value },
      meta: { invalid, dirty, touched, error, submitFailed },
      className,
      noErrorMessage,
      errorPosition,
      translations,
    } = this.props;

    return (
      <Block className={classNames(className, styles.wrapper)}>
        <Block className={styles.itemsList}>
          <Block
            onClick={this.onChange('reject')}
            className={classNames(styles.item, styles.reject, { [styles.active]: value === 'reject' })}
          >
            <Svg type="success" className={styles.icon} />
            {translations.rateFieldReject}
          </Block>
          <Block
            onClick={this.onChange('pause')}
            className={classNames(styles.item, styles.pause, { [styles.active]: value === 'pause' })}
          >
            <Svg type="success" className={styles.icon} />
            {translations.rateFieldPause}
          </Block>
          <Block
            onClick={this.onChange('hr')}
            className={classNames(styles.item, styles.hr, { [styles.active]: value === 'hr' })}
          >
            <Svg type="success" className={styles.icon} />
            {translations.rateFieldHr}
          </Block>
          <Block
            onClick={this.onChange('hm')}
            className={classNames(styles.item, styles.hm, { [styles.active]: value === 'hm' })}
          >
            <Svg type="success" className={styles.icon} />
            {translations.rateFieldHm}
          </Block>

          {!noErrorMessage &&
            ((error && touched) || (error && dirty) || (submitFailed && invalid)) && (
              <Block className={classNames(styles.error, styles[errorPosition])}>{error}</Block>
            )}
        </Block>
      </Block>
    );
  }
}

RateField.propTypes = {
  className: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
  }).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  meta: PropTypes.shape({
    form: PropTypes.string,
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
  }),
  translations: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  submitSucceeded: PropTypes.bool,
  noErrorMessage: PropTypes.bool,
  errorPosition: PropTypes.oneOf(['top', 'topForSmall']),
};

RateField.defaultProps = {
  className: null,
  meta: {},
  submitSucceeded: false,
  noErrorMessage: false,
  errorPosition: null,
};

const mapStateToProps = state => ({
  translations: getTranslations(state),
});

export default connect(mapStateToProps)(RateField);
