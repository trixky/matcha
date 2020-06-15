import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './Footer.css'

// import social network icone
import Facebook from '../img/social_icone/Circle Black White/Facebook_2.svg'
import Twitter from '../img/social_icone/Circle Black White/Twitter_2.svg'
import Pinterest from '../img/social_icone/Circle Black White/Pinterest_2.svg'
import Github from '../img/social_icone/Circle Black White/Github_2.svg'
import Instagram from '../img/social_icone/Circle Black White/Instagram_2.svg'

class Footer extends Component {
	disconnectConstructor() {
		const page = this.props.readPage();
		if (page !== 'Authentification' &&
			page !== 'ForgotUsername' &&
			page !== 'ForgotPassword' &&
			page !== 'ForgotPasswordSend' &&
			page !== 'ForgotUsernameSend')
			return (
				<p className='underline disconnect-btn'><Link to='/authentification'>disconnect</Link></p>
			)
		return (null)
	}

	render() {
		return (
			<footer>
				<ul>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img scale-hover' src={Facebook} alt='Facebook logo' />
						</a>
					</li>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img scale-hover' src={Twitter} alt='Twitter logo' />
						</a>
					</li>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img scale-hover' src={Pinterest} alt='Pinterest logo' />
						</a>
					</li>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img scale-hover' src={Instagram} alt='Instagram logo' />
						</a>
					</li>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img scale-hover' src={Github} alt='Github logo' />
						</a>
					</li>

				</ul>
				{this.disconnectConstructor()}
			</footer>
		)
	}
}

export default Footer