import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './ForgotUsername.css'

class ForgotUsername extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'ForgotUsername')
			this.props.setPage('ForgotUsername');
	}

	handleSubmit(event) {
		event.preventDefault();

		// il faudra ici faire un petit chargement pour etre sur que la demande a ete
		// recu par le serveur avant d'aller sur la prochaine page

		this.props.history.push('/forgotUsernameSend');
	}

	render() {
		return (
			<div className='intern-page forgot-username-container'>
				<h2 className='forgot-username-title'>forgot username</h2>
				<p>Please enter your account email so we can send you your username.</p>
				<form onSubmit={this.handleSubmit.bind(this)} className='forgot-username-form'>
					<input className='form-input' type='email' placeholder='email' required />
					<input className='form-input auth-submit' type='submit' value='send' />
				</form>
			</div>
		);
	}
}

export default withRouter(ForgotUsername);
