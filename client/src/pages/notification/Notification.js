import React, { Component } from 'react'

import './Notification.css'

import NotificationLine from './components/NotificationLine'

class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: []
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.fetchNotification = this.fetchNotification.bind(this);
	}

	componentDidMount() {
		this.date = Date.now();

		if (this.props.readPage() !== 'Notification')
			this.props.setPage('Notification');
		this.fetchNotification()
	}

	fetchNotification() {
		const requestOptions = {
			method: 'GET',
		};
		fetch('/notifications', requestOptions)
			.then(response => response.json())
			.then(data => {
				this.setState({ notifications: data._data})
			});
	}



	render() {
		return (
			<div className='intern-page'>
				<div className='notification-container'>
					{this.state.notifications.map((info, index) => <NotificationLine key={index + Date.now()} info={info} />)}
				</div>
			</div>
		);
	}
}

export default Notification;
