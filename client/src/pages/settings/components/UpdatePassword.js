import React, { Component } from 'react'

import './UpdatePassword.css'

class UpdatePassword extends Component {
	render() {
		return (
			<form>
				<input className='form-input' type='password' placeholder='new password' autoComplete='on' required />
				<input className='form-input' type='password' placeholder='new password confirmation' autoComplete='on' required />
				<input className='form-input auth-submit' type='submit' value='update my password' />
				<p className='update-settings-description'>If you have lost your current password, log out and request a password reset email.</p>
			</form>
		);
	}
}

export default UpdatePassword;
