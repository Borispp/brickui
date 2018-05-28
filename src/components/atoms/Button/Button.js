import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Link from '../Link';
import Text from '../Text';
import Svg from '../Svg';

import styles from './Button.scss';

const Button = ({
  href,
  size,
  fontWeight,
  kind,
  color,
  className,
  children,
  submitting,
  isActive,
  count,
  ...props
}) => {
  const Component = href ? Link : 'button';

  return (
    <Component
      {...props}
      href={href}
      className={classNames(
        styles.btn,
        styles[size],
        styles[fontWeight],
        styles[kind],
        styles[color],
        {
          [styles.submitting]: submitting,
          [styles.active]: isActive,
          [styles.count]: count !== null,
        },
        className,
      )}
    >
      {submitting ? (
        <Svg type="spinning" className={styles.submittingIcon} />
      ) : (
        <React.Fragment>
          {children} {count !== null && <Text class={styles.countText}>{count}</Text>}
        </React.Fragment>
      )}
    </Component>
  );
};

Button.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  size: PropTypes.oneOf(['small', 'normal', 'medium', 'big']),
  fontWeight: PropTypes.oneOf(['regular', 'semiBold', 'bold']),
  kind: PropTypes.oneOf(['round', 'group']),
  color: PropTypes.oneOf(['orange', 'transparent', 'red']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  submitting: PropTypes.bool,
  isActive: PropTypes.bool,
  count: PropTypes.number,
};

Button.defaultProps = {
  href: null,
  size: 'normal',
  fontWeight: 'regular',
  kind: null,
  color: 'orange',
  className: null,
  submitting: false,
  isActive: false,
  count: null,
};

export default Button;
