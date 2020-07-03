import React, { Component } from 'react'

import './UpdatePassword.css'

class UpdatePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			confirmation_value: '',
			password_err_message: ''
		}

		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeConfirmationPassword = this.handleChangeConfirmationPassword.bind(this);
	}

	handleChangePassword(event) {
		this.setState({value: event.target.value})
	}

	handleChangeConfirmationPassword(event) {
		this.setState({confirmation_value: event.target.value})
	}

	render() {
		return (
			<form>
				<input className='form-input' type='password' onChange={this.handleChangePassword} placeholder='new password' autoComplete='on' required />
				<input className='form-input' type='password' onChange={this.handleChangeConfirmationPassword} placeholder='new password confirmation' autoComplete='on' required />
				<input className='form-input auth-submit' type='submit' value='update my password' />
				<p className='update-settings-description'>If you have lost your current password, log out and request a password reset email.</p>
			</form>
		);
	}
}

export default UpdatePassword;
