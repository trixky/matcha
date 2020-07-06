import React, { Component } from 'react'

import './Message.css'

class Message extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('********************************* 1')
		console.log(this.props)
		console.log('********************************* 2')
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
