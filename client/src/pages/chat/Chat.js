import React, { Component } from 'react'

import './Chat.css'

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.fetchMessage = this.fetchMessage.bind(this);
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Chat')
			this.props.setPage('Chat');
		this.fetchMessage();
	}

	fetchMessage() {
		const current_user = window.location.pathname.split('/')[2];

		console.log(current_user)
		const requestOptions = {
			method: 'GET',
		};

		fetch('/messages/' + current_user, requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data)
			});
	}

	render() {
		const data = this.state.data;
		return (
			<div className='intern-page chat-container'>
				<h2 className='profil-title'>{data ? data.username : 'loading...'}</h2>
				<h3 className='connection-status'>{data ? data.connected ? 'connected' : data.updated : 'loading...'}</h3>
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
