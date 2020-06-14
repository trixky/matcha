import React, { Component } from 'react'
import './ForgotUsername.css'

class ForgotUsername extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'ForgotUsername')
			this.props.setPage('ForgotUsername');
	}

	render() {
		return (
			<div className='intern-page forgot-username-container'>
				<h2 className='forgot-username-title'>forgot username</h2>
				<p>Please enter your account email so we can send you your username.</p>
				<form className='forgot-username-form'>
					<input className='form-input' type='email' placeholder='email' required />
					<input className='form-input auth-submit' type='submit' value='send' />
				</form>
			</div>
		);
	}
}

export default ForgotUsername;
