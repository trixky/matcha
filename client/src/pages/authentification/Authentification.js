import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './Authentification.css'

class Authentification extends Component {

	constructor(props) {
		super(props);
		this.handleCreate = this.handleCreate.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.log = this.log.bind(this);
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Authentification')
			this.props.setPage('Authentification');
	}


	log() {
		console.log(this.xhr.responseText);
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
			.then(data => { console.log(data) });
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
						<p>invalid email</p>
						<input className='form-input' name="email" type='email' placeholder='email' required />
						<input className='form-input' name="username" type='text' placeholder='username' required />
						<input className='form-input' name="firstname" type='text' placeholder='name' required />
						<input className='form-input' name="lastname" type='text' placeholder='first name' required />
						<input className='form-input' name="password" type='password' placeholder='password' autoComplete='on' required />
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
