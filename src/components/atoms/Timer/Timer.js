import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import Block from 'components/atoms/Block';
import Text from 'components/atoms/Text';

import styles from './Timer.scss';

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      secondsPassed: 0,
    };
  }

  onStart = () => {
    const now = new Date().getTime();
    this.setState({ secondsPassed: 0 });

    this.timer = setInterval(() => {
      const secondsPassed = Math.round((new Date().getTime() - now) / 1000);

      if (this.props.limit && secondsPassed > this.props.limit) {
        this.onStop();
        this.props.onStop();
        return;
      }

      this.setState({ secondsPassed });
    }, 500);
  };

  onStop = () => clearInterval(this.timer);

  render() {
    const { className, limit } = this.props;
    const { secondsPassed } = this.state;

    return (
      <Block className={classNames(styles.wrapper, className)}>
        {moment
          .utc()
          .minutes(0)
          .seconds(secondsPassed)
          .format('mm:ss')}
        {limit && (
          <Text>
            &nbsp;of{' '}
            {moment
              .utc()
              .minutes(0)
              .seconds(limit)
              .format('mm:ss')}
          </Text>
        )}
      </Block>
    );
  }
}

Timer.propTypes = {
  className: PropTypes.string,
  limit: PropTypes.number,
  onStop: PropTypes.func,
};

Timer.defaultProps = {
  className: null,
  limit: null,
  onStop: null,
};

export default Timer;
