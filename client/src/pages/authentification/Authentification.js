import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './Authentification.css'

class Authentification extends Component {
	state = {
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
			first_name: {
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
		}
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Authentification')
			this.props.setPage('Authentification');
	}

	handleCreate(event) {
		event.preventDefault();

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
		
		fetch('/users/create', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data._data)
			});
	}

	handleLogin(event) {
		event.preventDefault();

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
			.then(data => { console.log(data) });
	}

	render() {
		return (
			<div className='intern-page auth-container'>
				<div className='register-container'>
					<h2 className='auth-title'>register</h2>
					<form className='auth-form' onSubmit={this.handleCreate}>
						<p className='error-input email off'>Invalid email:<br /><span>error message</span></p>
						<input className='form-input' name="email" type='email' placeholder='email' required />
						<p className='error-input username off'>Invalid username:<br /><span>error message</span></p>
						<input className='form-input' name="username" type='text' placeholder='username' required />
						<p className='error-input name off'>Invalid name:<br /><span>error message</span></p>
						<input className='form-input' name="firstname" type='text' placeholder='name' required />
						<p className='error-input lastname off'>Invalid lastname:<br /><span>error message</span></p>
						<input className='form-input' name="lastname" type='text' placeholder='first name' required />
						<p className='error-input password off'>Invalid password:<br /><span>error message</span></p>
						<input className='form-input' name="password" type='password' placeholder='password' autoComplete='on' required />
						<p className='error-input confirmation-password off'>Invalid confirmation password :<br /><span>error message</span></p>
						<input className='form-input' name="confirmation password" type='password' placeholder='confirmation password' autoComplete='on' required />
						<input className='form-input auth-submit' type='submit' value='register' />
					</form>
				</div>
				<div className='login-container' onSubmit={this.handleLogin}>
					<h2 className='auth-title'>login</h2>
					<form className='auth-form'>
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

export default Authentification;
