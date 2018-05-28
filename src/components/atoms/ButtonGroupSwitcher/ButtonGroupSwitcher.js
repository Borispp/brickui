import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';

import Block from 'components/atoms/Block';
import Button from 'components/atoms/Button';
import Label from 'components/atoms/Label';

import styles from './ButtonGroupSwitcher.scss';

class ButtonGroupSwitcher extends React.PureComponent {
  render() {
    const { className, buttonList, label } = this.props;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        {label && <Label className={classNames(styles.label)}>{label}</Label>}
        <Block className={styles.controls}>
          {map(buttonList, button => (
            <Button
              key={button.id}
              type="button"
              color="greyTransparent"
              size="small"
              kind="group"
              className={styles.controlButton}
              onClick={button.onClick}
              isActive={button.isActive}
              count={button.count}
            >
              {button.name}
            </Button>
          ))}
        </Block>
      </Block>
    );
  }
}

ButtonGroupSwitcher.propTypes = {
  className: PropTypes.string,
  buttonList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      isActive: PropTypes.bool,
      count: PropTypes.number,
    }),
  ).isRequired,
  label: PropTypes.string,
};

ButtonGroupSwitcher.defaultProps = {
  className: null,
  label: null,
};

export default ButtonGroupSwitcher;
