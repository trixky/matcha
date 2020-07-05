import React, { Component } from 'react'

import './Chat.css'

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Chat')
			this.props.setPage('Chat');
	}

	render() {
		const username = 'uSeRnAmE'
		return (
			<div className='intern-page chat-container'>
				<h2>{username}</h2>
				<div className='message-container'>
					<div className='message message-right'>
						<p className='message-time'>xx:xx:xxxx</p>
						<p>that is a message !</p>
					</div>
					<div className='message message-left'>
						<p className='message-time'>xx:xx:xxxx</p>
						<p>that is a message !</p>
					</div>
				</div>
				<form>
					<input className='form-input chat-message-input' name="username" type='text' placeholder='your message...' required />
					<input className='form-input chat-send-input' type='submit' value='send' />
				</form>
			</div>
		);
	}
}

export default Chat;
