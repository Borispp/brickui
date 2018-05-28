import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import { getNotification } from 'modules/app/selectors';

class Notification extends PureComponent {
  componentWillReceiveProps({ notification }) {
    if (notification && notification !== this.props.notification) {
      const { type, content } = notification;

      switch (type) {
        case 'success':
          NotificationManager.success(content);
          break;
        case 'warn':
          NotificationManager.warning(content);
          break;
        case 'info':
          NotificationManager.info(content);
          break;
        case 'error':
          NotificationManager.error(content);
          break;

        default:
          break;
      }
    }
  }

  render() {
    return <NotificationContainer />;
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
  }),
};

Notification.defaultProps = {
  notification: null,
};

const mapStateToProps = state => ({
  notification: getNotification(state),
});

export default connect(mapStateToProps)(Notification);
