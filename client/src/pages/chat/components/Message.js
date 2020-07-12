import React, { Component } from 'react'

import './Message.css'

class Message extends Component {

	render() {
		const info = this.props.info;
		return (
			<div className={'message ' + (this.props.pretender === info.sender ? 'message-left' : 'message-right')}>
				<p className='message-time'>{info.created}</p>
				<p>{info.message}</p>
			</div>
		);
	}
}

export default Message;
