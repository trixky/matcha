import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Previous_icone from '../../shared/img/interface_icone/previous.svg'

import './ForgotPasswordSend.css'

class ForgotPasswordSend extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'ForgotPasswordSend')
			this.props.setPage('ForgotPasswordSend');
	}

	render() {
		return (
			<div className='intern-page forgot-password-send-container'>
				<h2 className='forgot-password-send-title'>email sent</h2>
				<p>You will receive in an email with a password reset link.</p>
				<p>If you do not receive the email, check your spam emails or resend a password reset request.</p>
				<Link to='/forgotPassword'>
					<img className='header-img scale-hover' src={Previous_icone} alt='link for resend a password reset request' />
				</Link>
			</div>
		);
	}
}

export default ForgotPasswordSend;
