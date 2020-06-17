import React, { Component } from 'react'

import UpdateName from './components/UpdateName'
import UpdateFirstName from './components/UpdateFirstName'
import UpdatePassword from './components/UpdatePassword'
import UpdateEmail from './components/UpdateEmail'

import './Settings.css'

class Settings extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Settings')
			this.props.setPage('Settings');
	}

	render() {
		return (
			<div className='intern-page update-form-container'>
				<h2 className='settings-title'>settings</h2>
				<UpdateName />
				<UpdateFirstName />
				<UpdatePassword />
				<UpdateEmail />
			</div>
		);
	}
}

export default Settings;