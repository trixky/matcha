import React, { Component } from 'react'

import './NotificationLine.css'

class NotificationLine extends Component {
	time_generator(date) {
		console.log(date)
		return `${Date.now() + 5 - date} sec`
	}

	render() {
		this.emoji = '⚠️'
		this.message = 'loading error'
		switch (this.props.type) {
			case 'liked':
				this.emoji = '❤️'
				this.message = 'like you'
				break;
			case 'liked back':
				this.emoji = '💕'
				this.message = 'liked you back'
				break;
			case 'unliked':
				this.emoji = '💔'
				this.message = 'doesn\'t love you anymore'
				break;
			case 'blocked':
				this.emoji = '🤐'
				this.message = 'blocked you'
				break;
			case 'unblocked':
				this.emoji = '😇'
				this.message = 'unblocked you'
				break;
				case 'seen':
				this.emoji = '👁️'
				this.message = 'saw your profile'
				break;
			default:
				break;

		}
		return (
			<div className='notification-line'>
				<p>{this.emoji} {this.props.username != null ? this.props.username : 'someone'} {this.message} <span className='notification-time'>{this.time_generator(this.props.date)}</span></p>
			</div>
		);
	}
}

export default NotificationLine;
