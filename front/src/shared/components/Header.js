import React, { Component } from 'react'

import { Link } from "react-router-dom";

import './Header.css'

import Search_icone from '../img/interface_icone/search.svg'
import Chat_icone from '../img/interface_icone/speech-bubble-18.svg'
import Heart_icone from '../img/interface_icone/heart-2.svg'
import Account_icone from '../img/interface_icone/user-1.svg'
import Notification_icone from '../img/interface_icone/down-arrow.svg'

class Header extends Component {
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
						<Link to='/search'>
							<img className='header-img' src={Search_icone} alt='link to search page' />
						</Link>
						<Link to='/pretenders'>
							<img className='header-img' src={Heart_icone} alt='link to pretenders page' />
						</Link>
						<Link to='/chat'>
							<img className='header-img' src={Chat_icone} alt='link to chat page' />
						</Link>
						<Link to='/notification'>
							<img className='header-img' src={Notification_icone} alt='link to notification page' />
						</Link>
						<Link to='/account'>
							<img className='header-img' src={Account_icone} alt='link to account page' />
						</Link>
					</nav>
				</div>
			</header>
		)
	}
}

export default Header