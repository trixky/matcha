import React, { Component } from 'react'

import './UpdateEmail.css'

class UpdateEmail extends Component {
	state = {
		value: 'paco@coca.in'
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<form>
				<input className='form-input' type='email' placeholder='new email' value={this.state.value} onChange={this.handleChange.bind(this)} required />
				<input className='form-input auth-submit' type='submit' value='update my email' />
				<p className='update-settings-description'>Once your new email confirm, your old email will be obsolete.</p>
			</form>
		);
	}
}

export default UpdateEmail;
