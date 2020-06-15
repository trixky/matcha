import React, { Component } from 'react'

import './AccountOption.css'

class AccountOption extends Component {
	render() {
		return (
			<div className='account-options-containers'>
				<input className='form-input auth-submit' type='submit' value='show my profile'/>
				<input className='form-input auth-submit' type='submit' value='update my profile'/>
				<input className='form-input auth-submit' type='submit' value='show my settings'/>
				<input className='form-input auth-submit' type='submit' value='update my settings'/>
			</div>
		);
	}
}

export default AccountOption;
