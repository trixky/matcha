import React, {Fragment} from 'react'
import './Chat.css'

import Pretender from './components/Pretender'

function Chat() {
	return (
		<Fragment>
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
		</Fragment>
	);
}

export default Chat;
