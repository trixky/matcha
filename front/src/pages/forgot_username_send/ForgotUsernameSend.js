import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Previous_icone from '../../shared/img/interface_icone/previous.svg'

import './ForgotUsernameSend.css'

class ForgotUsernameSend extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'ForgotUsernameSend')
			this.props.setPage('ForgotUsernameSend');
	}

	render() {
		return (
			<div className='intern-page forgot-username-send-container'>
				<h2 className='forgot-username-send-title'>email sent</h2>
				<p>You will receive in an email with your username.</p>
				<p>If you do not receive the email, check your spam emails or resend an username request.</p>
				<Link to='/forgotUsername'>
					<img className='header-img scale-hover' src={Previous_icone} alt='link for resend a username request' />
				</Link>
			</div>
		);
	}
}

export default ForgotUsernameSend;
