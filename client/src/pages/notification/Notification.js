import React, { Component } from 'react'

import './Notification.css'

import NotificationLine from './components/NotificationLine'

class Notification extends Component {
	componentDidMount() {
		this.date = Date.now();

		if (this.props.readPage() !== 'Notification')
			this.props.setPage('Notification');
	}

	render() {
		return (
			<div className='intern-page notification-container'>
				<NotificationLine type='liked' username='toto' date={this.date}/>
				<NotificationLine type='liked back' username='toto' date={this.date}/>
				<NotificationLine type='unliked' username='toto' date={this.date}/>
				<NotificationLine type='blocked' username='toto' date={this.date}/>
				<NotificationLine type='unblocked' date={this.date}/>
				<NotificationLine type='seen' username='toto' date={this.date}/>
			</div>
		);
	}
}

export default Notification;
