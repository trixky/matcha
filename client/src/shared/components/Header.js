import React, { Component, Fragment } from 'react'

import { Link } from "react-router-dom";

import './Header.css'

import Search_icone from '../img/interface_icone/search.svg'
import Chat_icone from '../img/interface_icone/speech-bubble-18.svg'
import Heart_icone from '../img/interface_icone/heart-2.svg'
import Account_icone from '../img/interface_icone/user-1.svg'
import Notification_icone from '../img/interface_icone/down-arrow.svg'

// import socket
import socket from "../../Socket"

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			notification: false
		}
		this.handleNotifs = this.handleNotifs.bind(this);
		this.handleMessages = this.handleMessages.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.navConstructor = this.navConstructor.bind(this);
		this.dontActiveNotification = this.dontActiveNotification.bind(this);
	}

	handleNotifs() {
		this.setState({ notification: true })
	}

	handleMessages() {
		this.setState({ notification: true })
	}

	componentDidMount() {
		const id = cookies.get('my_id');
		if (id != undefined) {
			socket.connect(id, (data) => this.handleNotifs(data), (data) => this.handleMessages(data))
		}
	}

	dontActiveNotification() {
		if (this.state.notification) {
			if (window.location.pathname.split('/')[1] === 'notification') {
				this.setState({ notification: false })
			}
		}
	}

	navConstructor() {
		this.dontActiveNotification()
		const page = this.props.readPage();
		if (page !== 'Authentification' &&
			page !== 'ForgotUsername' &&
			page !== 'ForgotPassword' &&
			page !== 'ForgotPasswordSend' &&
			page !== 'ForgotUsernameSend')
			return (
				<Fragment>
					<Link to='/search'>
						<img className='header-img scale-hover' src={Search_icone} alt='link to search page' />
					</Link>
					<Link to='/people'>
						<img className='header-img scale-hover' src={Heart_icone} alt='link to pretenders page' />
					</Link>
					<Link to='/notification'>
						<img className={'header-img scale-hover ' + (this.state.notification ? 'new_notification' : null)} src={Notification_icone} alt='link to notification page' />
					</Link>
					<Link to='/account'>
						<img className='header-img scale-hover' src={Account_icone} alt='link to account page' />
					</Link>
				</Fragment>
			)
		return (
			<Fragment>
				<img className='header-img blocked-hander-img' src={Search_icone} alt='link to search page' />
				<img className='header-img blocked-hander-img' src={Heart_icone} alt='link to pretenders page' />
				<img className={'header-img blocked-hander-img ' + (this.state.notification ? 'new_notification' : null)} src={Notification_icone} alt='link to notification page' />
				<img className='header-img blocked-hander-img' src={Account_icone} alt='link to account page' />
			</Fragment>
		)
	}

	render() {
		return (
			<header>
				<div className='header-top'>
					<h1>matcha</h1>
				</div>
				<div className='header-bottom'>
					<nav>
						{this.navConstructor()}
					</nav>
				</div>
			</header>
		)
	}
}

export default Header