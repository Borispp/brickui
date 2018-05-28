import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SingleDatePicker } from 'react-dates';

import Block from 'components/atoms/Block';

import styles from './DatePicker.scss';

class DatePicker extends React.PureComponent {
  render() {
    const { className, id, numberOfMonths, onDateChange, date } = this.props;

    return (
      <Block className={classNames(className, styles.wrapper)}>
        <SingleDatePicker
          date={date}
          onDateChange={onDateChange}
          numberOfMonths={numberOfMonths}
          small
          focused
          onFocusChange={() => {}} // PropTypes.func.isRequired
          id={id}
        />
      </Block>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  numberOfMonths: PropTypes.number.isRequired,
  onDateChange: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
};

DatePicker.defaultProps = {
  className: null,
};

export default DatePicker;
