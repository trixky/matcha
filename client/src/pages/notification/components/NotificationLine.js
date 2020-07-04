import React, { Component } from 'react'

import './NotificationLine.css'

class NotificationLine extends Component {
	render() {
		const info = this.props.info
		return (
			<div className='notification-line'>
				<p>{info.notification} <span className='notification-time'>{info.created}</span></p>
			</div>
		);
	}
}

export default NotificationLine;
