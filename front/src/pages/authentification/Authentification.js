import React from 'react'
import { Link } from "react-router-dom";

import './Authentification.css'

function Authentification() {
	return (
		<div className='auth-container'>
			<div className='register-container'>
				<h2>register</h2>
				<form>
					<input className='auth-input' type='email' placeholder='email' />
					<input className='auth-input' type='text' placeholder='username' />
					<input className='auth-input' type='text' placeholder='name' />
					<input className='auth-input' type='text' placeholder='first name' />
					<input className='auth-input' type='password' placeholder='password' />
					<input className='auth-input' type='password' placeholder='password confirmation' />
					<input className='auth-input auth-submit' type='submit' value='register' />
				</form>
			</div>
			<div className='login-container'>
				<h2>login</h2>
				<form>
					<input className='auth-input' type='text' placeholder='username' />
					<input className='auth-input' type='password' placeholder='password' />
					<input className='auth-input auth-submit' type='submit' value='login' />
				</form>
				<div className='forgot-identifiers-container'>
					<Link to='/'>
						<p className='forgot-identifiers underline'>forgot username</p>
					</Link>
					<Link to='/'>
						<p className='forgot-identifiers underline'>forgot password</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Authentification;
