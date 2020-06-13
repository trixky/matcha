import React from 'react'
import './Chat.css'

import Pretender from './components/Pretender'

function Chat() {
	return (
		<div className='chat-container'>
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

export default Chat;
