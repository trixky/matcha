import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './ForgotPassword.css'

class ForgotPasswordSend extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'ForgotPassword')
			this.props.setPage('ForgotPassword');
	}

	handleSubmit(event) {
		event.preventDefault();

		// il faudra ici faire un petit chargement pour etre sur que la demande a ete
		// recu par le serveur avant d'aller sur la prochaine page

		this.props.history.push('/forgotPasswordSend');
	}

	render() {
		return (
			<div className='intern-page forgot-password-container'>
				<h2 className='forgot-password-title'>forgot password</h2>
				<p>Please enter your account email so we can send you a password reset link.</p>
				<form onSubmit={this.handleSubmit.bind(this)} className='forgot-password-form'>
					<input className='form-input' type='email' placeholder='email' required />
					<input className='form-input auth-submit' type='submit' value='send' />
				</form>
			</div>
		);
	}
}

export default withRouter(ForgotPasswordSend);
