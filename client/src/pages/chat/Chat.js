import React, { Component } from 'react'

import './Chat.css'
import Message from './components/Message'

import socket from "../../Socket"

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			value: ''
		}
		this.addMessage = this.addMessage.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.fetchMessage = this.fetchMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.formatDate = this.formatDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.pretender = window.location.pathname.split('/')[2];
	}

	addMessage(data) {
		let messages = [...this.state.messages]
		messages.push(data)
		this.setState({ messages })
	}

	handleNotifs(data) {
		// console.log(data)
	}

	handleMessages(data) {
		if (data.sender === this.pretender)
			this.addMessage(data)
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Chat')
			this.props.setPage('Chat');
		this.fetchMessage();
		const id = cookies.get('my_id');
		if (id !== undefined) {
			socket.connect(id, (data) => this.handleNotifs(data), (data) => this.handleMessages(data))
		}
	}

	fetchMessage() {
		const current_user = this.pretender;

		// console.log(current_user)
		const requestOptions = {
			method: 'GET',
		};

		fetch('/messages/' + current_user, requestOptions)
			.then(response => response.json())
			.then(data => {
				this.setState({ messages: data._data })
			});
	}

	handleChange(e) {
		this.setState({ value: e.currentTarget.value })
	}

	formatDate() {
		const date = new Date();

		return (date.getUTCDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes());
	}

	handleSubmit(e) {
		e.preventDefault()

		const body = JSON.stringify({ user: { username: this.pretender, message: this.state.value } });
		const headers = { 'Content-Type': 'application/json' }

		const requestOptions = {
			method: 'POST',
			headers,
			body
		};
		fetch('/messages', requestOptions)
		this.addMessage({pretender: 'me', sender: 'me', message: this.state.value, created: this.formatDate() })
		this.setState({ value: '' })
	}

	render() {
		return (
			<div className='intern-page chat-container'>
				<h2 className='profil-title'>{this.pretender}</h2>
				<div className='message-form-container'>
					<div className='message-container'>
						{this.state.messages.map((message, index, array) => <Message key={message.created + Date.now() * Math.random()} info={array[index]} pretender={this.pretender} />)}
					</div>
					<form onSubmit={this.handleSubmit}>
						<input className='form-input chat-message-input' name="username" type='text' value={this.state.value} onChange={this.handleChange} placeholder='your message...' required />
						<input className='form-input chat-send-input' type='submit' value='send' />
					</form>
				</div>
			</div>
		);
	}
}

export default Chat;
