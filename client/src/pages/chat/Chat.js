import React, { Component } from 'react'

import './Chat.css'

class Chat extends Chat {
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
		return (
			<div className='intern-page chat-container'>
			<h2>chaaaat</h2>
			</div>
		);
	}
}

export default Chat;
