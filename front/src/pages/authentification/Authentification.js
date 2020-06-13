import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './Authentification.css'

class Authentification extends Component {

	componentDidMount() {
		if (this.props.readPage() !== 'Authentification')
			this.props.setPage('Authentification');
	}

	render() {
		return (
			<div className='auth-container'>
				<div className='register-container'>
					<h2 className='auth-title'>register</h2>
					<form className='auth-form'>
						<input className='auth-input' type='email' placeholder='email' />
						<input className='auth-input' type='text' placeholder='username' />
						<input className='auth-input' type='text' placeholder='name' />
						<input className='auth-input' type='text' placeholder='first name' />
						<input className='auth-input' type='password' placeholder='password' autoComplete='on' />
						<input className='auth-input' type='password' placeholder='password confirmation' autoComplete='on' />
						<input className='auth-input auth-submit' type='submit' value='register' />
					</form>
				</div>
				<div className='login-container'>
					<h2 className='auth-title'>login</h2>
					<form className='auth-form'>
						<input className='auth-input' type='text' placeholder='username' />
						<input className='auth-input' type='password' placeholder='password' autoComplete='on' />
						<input className='auth-input auth-submit' type='submit' value='login' />
					</form>
					<div className='forgot-identifiers-container'>
						<p className='forgot-identifiers underline'><Link to='/'>forgot username</Link></p>
						<p className='forgot-identifiers underline'><Link to='/'>forgot password</Link></p>
					</div>
				</div>
			</div>
		);
	}
}

export default Authentification;
