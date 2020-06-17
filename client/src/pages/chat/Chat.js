import React, { Component } from 'react'
import './Chat.css'

import Pretender from './components/Pretender'

class Chat extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Chat')
			this.props.setPage('Chat');
	}

	render() {
		return (
			<div className='intern-page chat-container'>
				<div className='pretenders-chat-list'>
					<Pretender />
					<Pretender />
					<Pretender />
					<Pretender />
					<Pretender />
				</div>
				<div className='chat-box'>
					<p>chat-box</p>
				</div>
			</div>
		);
	}
}

export default Chat;
