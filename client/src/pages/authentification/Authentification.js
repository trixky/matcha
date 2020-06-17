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
		const formData = new FormData(event.target);
		event.preventDefault();

		let create =  { user: {} };
		formData.forEach(function(value, key) {
			create.user[key] = value;
		});

		this.xhr = new XMLHttpRequest();
		this.xhr.open('post', '/users/create', true);
		this.xhr.setRequestHeader("Content-Type", "application/json");
        this.xhr.onload = this.log;
        this.xhr.send(JSON.stringify(create));
	}

	handleLogin(event) {
		const formData = new FormData(event.target);
		event.preventDefault();

		let login =  { user: {} };
		formData.forEach(function(value, key) {
			login.user[key] = value;
		});

		this.xhr = new XMLHttpRequest();
		this.xhr.open('post', '/users/login', true);
		this.xhr.setRequestHeader("Content-Type", "application/json");
		this.xhr.onload = this.log;
        this.xhr.send(JSON.stringify(login));
	}

	render() {
		return (
			<div className='intern-page auth-container'>
				<div className='register-container'>
					<h2 className='auth-title'>register</h2>
					<form className='auth-form' onSubmit={this.handleCreate}>
						<input className='form-input' name="email" type='email' placeholder='email' required />
						<input className='form-input' name="username" type='text' placeholder='username' required />
						<input className='form-input' name="firstname" type='text' placeholder='name' required />
						<input className='form-input' name="lastname" type='text' placeholder='first name' required />
						<input className='form-input' name="password" type='password' placeholder='password' autoComplete='on' required />
						<input className='form-input auth-submit' type='submit' value='register'/>
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
