import React, { Component } from 'react';
import NotificationItem from './notificationItem';

export class notification extends Component {
  render() {
        return this.props.notif.map((notification) => (
          <NotificationItem key={notification._id} notification={notification}  />
        ));
  }
}

export default notification;
