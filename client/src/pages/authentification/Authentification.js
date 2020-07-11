import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";

import './Authentification.css'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Authentification extends Component {

	constructor(props) {
		super(props);

		this.state = {
			identical_password: {
				password: '',
				confirmation_password: ''
			},
			invalid_input_register: {
				email: {
					status: 'off',
					message: ''
				},
				username: {
					status: 'off',
					message: ''
				},
				name: {
					status: 'off',
					message: ''
				},
				firstname: {
					status: 'off',
					message: ''
				},
				password: {
					status: 'off',
					message: ''
				},
				confirmation_password: {
					status: 'off',
					message: ''
				}
			},
			invalid_input_login: {
				all_input: {
					status: 'off',
					message: ''
				}
			},
			valid_input_register: 'off'
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
		this.handleConfirmationPasswordChanged = this.handleConfirmationPasswordChanged.bind(this);
		this.identical_password_check_on = this.identical_password_check_on.bind(this);
		this.identical_password_check_off = this.identical_password_check_off.bind(this);
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Authentification')
			this.props.setPage('Authentification');
		if (cookies.set('my_id') !== undefined)
			this.props.auth_disconnect();
		cookies.set('my_id', undefined);

		const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/disconnect', requestOptions)
	}

	handleLoginSuccess(url) {
		this.props.history.push(url);
	}

	handleCreate(event) {
		event.preventDefault();

		const _this = this;
		const formData = new FormData(event.target);

		let create = { user: {} };
		formData.forEach(function (value, key) {
			create.user[key] = value;
		});

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(create)
		};

		if (this.identical_password_check_on() === false) {
			fetch('/users/create', requestOptions)
				.then(response => response.json())
				.then(data => {
					let invalid_input_register = Object.assign(_this.state.invalid_input_register)
					if (data._status === -1) {
						Object.keys(invalid_input_register).forEach(key => {
							invalid_input_register[key].status = 'off';
							invalid_input_register[key].message = '';
						})
						Object.keys(data._data).forEach(key => {
							if (key !== '_status') {
								invalid_input_register[key].status = 'on';
								invalid_input_register[key].message = data._data[key];
							}
						})
						_this.setState({ invalid_input_register })
					} else {
						Object.keys(invalid_input_register).forEach(key => {
							invalid_input_register[key].status = 'off';
							invalid_input_register[key].message = '';
						})
						_this.setState({ invalid_input_register })
						_this.setState({ valid_input_register: 'on' })
					}
				});
		}
	}

	handleLogin(event) {
		event.preventDefault();

		const _this = this;
		const formData = new FormData(event.target);
		let login = { user: {} };

		formData.forEach(function (value, key) {
			login.user[key] = value;
		});

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(login)
		};

		fetch('/users/login', requestOptions)
			.then(response => response.json())
			.then(data => {
				if (data._status === -1) {
					let invalid_input_login = Object.assign(_this.state.invalid_input_login)
					invalid_input_login.all_input.status = 'on';
					invalid_input_login.all_input.message = data._data[0];
					_this.setState({ invalid_input_login })
				} else {
					_this.handleLoginSuccess('/search')
					cookies.set('my_id', data._data.id);
				}
			});
	}

	handlePasswordChanged(event) {
		let identical_password = Object.assign(this.state.identical_password);
		identical_password.password = event.currentTarget.value;
		this.setState({ identical_password })
	}

	handleConfirmationPasswordChanged(event) {
		let identical_password = Object.assign(this.state.identical_password);
		identical_password.confirmation_password = event.currentTarget.value;
		this.setState({ identical_password })
		this.identical_password_check_off()
	}

	identical_password_check_on() {
		let ret = false;
		const identical_password = this.state.identical_password
		let invalid_input_register = Object.assign(this.state.invalid_input_register)
		if (identical_password.password !== identical_password.confirmation_password) {
			invalid_input_register.confirmation_password.status = 'on';
			invalid_input_register.confirmation_password.message = 'the confirmation password must be the same as the password';
			ret = true;
		}
		this.setState({ invalid_input_register })
		return (ret);
	}

	identical_password_check_off() {
		const identical_password = this.state.identical_password
		let invalid_input_register = Object.assign(this.state.invalid_input_register)
		if (identical_password.password === identical_password.confirmation_password) {
			invalid_input_register.confirmation_password.status = 'off';
			invalid_input_register.confirmation_password.message = '';
		}
		this.setState({ invalid_input_register })
	}

	render() {
		return (
			<div className='intern-page auth-container'>
				<div className='register-container'>
					<h2 className='auth-title'>register</h2>
					<form className={`auth-form ${this.state.valid_input_register}`} onSubmit={this.handleCreate}>
						<p className={`error-input ${this.state.invalid_input_register.email.status}`}>Invalid email:<br /><span>{this.state.invalid_input_register.email.message}</span></p>
						<input className='form-input' name="email" type='email' placeholder='email' required />

						<p className={`error-input ${this.state.invalid_input_register.username.status}`}>Invalid username:<br /><span>{this.state.invalid_input_register.username.message}</span></p>
						<input className='form-input' name="username" type='text' placeholder='username' required />

						<p className={`error-input ${this.state.invalid_input_register.name.status}`}>Invalid name:<br /><span>{this.state.invalid_input_register.name.message}</span></p>
						<input className='form-input' name="name" type='text' placeholder='name' required />

						<p className={`error-input ${this.state.invalid_input_register.firstname.status}`}>Invalid firstname:<br /><span>{this.state.invalid_input_register.firstname.message}</span></p>
						<input className='form-input' name="firstname" type='text' placeholder='first name' required />

						<p className={`error-input ${this.state.invalid_input_register.password.status}`}>Invalid password:<br /><span>{this.state.invalid_input_register.password.message}</span></p>
						<input className='form-input' name="password" type='password' placeholder='password' autoComplete='on' onChange={this.handlePasswordChanged} required />

						<p className={`error-input ${this.state.invalid_input_register.confirmation_password.status}`}>Invalid confirmation password :<br /><span>{this.state.invalid_input_register.confirmation_password.message}</span></p>
						<input className='form-input' name="confirmation password" type='password' placeholder='confirmation password' autoComplete='on' onChange={this.handleConfirmationPasswordChanged} required />
						<input className='form-input auth-submit' type='submit' value='register' />
						<p className={`form-validation-message ${this.state.valid_input_register}`}>Thank you for your registration!<br />Check your emails and validate your account before trying to login.<br /><span>{this.state.invalid_input_register.confirmation_password.message}</span></p>
					</form>
				</div>
				<div className='login-container' onSubmit={this.handleLogin}>
					<h2 className='auth-title'>login</h2>
					<form className='auth-form'>
						<p className={`error-input ${this.state.invalid_input_login.all_input.status}`}>Invalid logs:<br /><span>{this.state.invalid_input_login.all_input.message}</span></p>
						<input className='form-input' name="email" type='email' placeholder='email' required />

						<input className='form-input' name="password" type='password' placeholder='password' autoComplete='on' required />
						<input className='form-input auth-submit' type='submit' value='login' />
					</form>
					<div className='forgot-identifiers-container'>
						<p className='forgot-identifiers underline'><Link to='/forgotUsername'>forgot username</Link></p>
						<p className='forgot-identifiers underline'><Link to='/forgotPassword'>forgot password</Link></p>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Authentification);
