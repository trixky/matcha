import React, { Component } from 'react'
import './Header.css'
import Search_icone from '../img/interface_icone/search.svg'
import Visits_icone from '../img/interface_icone/down-arrow.svg'
import Chat_icone from '../img/interface_icone/speech-bubble-18.svg'
import Heart_icone from '../img/interface_icone/heart-2.svg'

class Header extends Component {
	render() {
		return (
			<header>
				<div className='header-top'>
					<h1>matcha</h1>
				</div>
				<div className='header-bottom'>
					<nav>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='header-img' src={Search_icone} alt='link to search page' />
						</a>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='header-img' src={Visits_icone} alt='link to visits page' />
						</a>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='header-img' src={Heart_icone} alt='link to pretenders page' />
						</a>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='header-img' src={Chat_icone} alt='link to chat page' />
						</a>
					</nav>
				</div>
			</header>
		)
	}
}

export default Header