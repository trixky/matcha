import React, { Component, Fragment } from 'react'

import { Link } from "react-router-dom";

import './Header.css'

import Search_icone from '../img/interface_icone/search.svg'
import Chat_icone from '../img/interface_icone/speech-bubble-18.svg'
import Heart_icone from '../img/interface_icone/heart-2.svg'
import Account_icone from '../img/interface_icone/user-1.svg'
import Notification_icone from '../img/interface_icone/down-arrow.svg'

class Header extends Component {
	navConstructor() {
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
					<Link to='/chat'>
						<img className='header-img scale-hover' src={Chat_icone} alt='link to chat page' />
					</Link>
					<Link to='/notification'>
						<img className='header-img scale-hover' src={Notification_icone} alt='link to notification page' />
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
				<img className='header-img blocked-hander-img' src={Chat_icone} alt='link to chat page' />
				<img className='header-img blocked-hander-img' src={Notification_icone} alt='link to notification page' />
				<img className='header-img blocked-hander-img' src={Account_icone} alt='link to account page' />
			</Fragment>
		)
	}

	render() {
		return (
			<header>
				<div className='header-top'>
					<Link to='/'>
						<h1 className='title'>matcha</h1>
					</Link>
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