import React, { Component } from 'react'

import './UpdatePassword.css'

class UpdatePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			confirmation_value: '',
			password_err_message: '',
			confirmation_password_err_message: '',
		}

		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeConfirmationPassword = this.handleChangeConfirmationPassword.bind(this);
		this.submitHandle = this.submitHandle.bind(this);
	}

	handleChangePassword(event) {
		this.setState({ value: event.target.value })
	}

	handleChangeConfirmationPassword(event) {
		this.setState({ confirmation_value: event.target.value })
		if (this.state.value === event.target.value) {
			this.setState({ confirmation_password_err_message: '' })
		}
	}

	submitHandle(e) {
		e.preventDefault();
		const _this = this;
		const state = this.state;

		if (state.value === state.confirmation_value) {
			const body = {
				user: {
					password: state.value
				}
			}

			const requestOptions = {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body)
			};
			fetch('/account/password', requestOptions)
				.then((response) => response.json())
				.then(data => {
					if (data._status === -1) {
						_this.setState({ password_err_message: data._data })
					} else {
						_this.setState({
							password_err_message: '',
							value: '',
							confirmation_value: ''
						})
						alert('your password has been successfully updated')
					}
				})
		} else {
			_this.setState({ confirmation_password_err_message: 'the confirmation password must be the same as the password' })
		}
	}

	render() {
		return (
			<form onSubmit={this.submitHandle}>
				<input className='form-input' type='password' onChange={this.handleChangePassword} placeholder='new password' autoComplete='on' value={this.state.value} required />
				{this.state.password_err_message !== '' ? <p className={`error-input setting-input on`}>Invalid password:<br /><span>{this.state.password_err_message}</span></p> : null}
				<input className='form-input' type='password' onChange={this.handleChangeConfirmationPassword} placeholder='new password confirmation' autoComplete='on' value={this.state.confirmation_value} required />
				{this.state.confirmation_password_err_message !== '' ? <p className={`error-input setting-input on`}>Invalid confirmation password:<br /><span>{this.state.confirmation_password_err_message}</span></p> : null}
				<input className='form-input auth-submit' type='submit' value='update my password' />
				<p className='update-settings-description'>If you have lost your current password, log out and request a password reset email.</p>
			</form>
		);
	}
}

export default UpdatePassword;
