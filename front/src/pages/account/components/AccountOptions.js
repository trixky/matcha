import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './AccountOption.css'

class AccountOption extends Component {
	handleClick(url) {
		this.props.history.push(url);
	}

	render() {
		return (
			<div className='account-options-containers'>
				<input className='form-input auth-submit' onClick={() => (this.handleClick('/profile/username'))}type='submit' value='show my profile'/>
				<input className='form-input auth-submit' onClick={() => (this.handleClick('/updateProfile'))}type='submit' value='update my profile'/>
				<input className='form-input auth-submit' onClick={() => (this.handleClick('/settings'))}type='submit' value='settings'/>
			</div>
		);
	}
}

export default withRouter(AccountOption);
