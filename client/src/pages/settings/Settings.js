import React, { Component } from 'react'

import UpdateName from './components/UpdateName'
import UpdateFirstName from './components/UpdateFirstName'
import UpdatePassword from './components/UpdatePassword'
import UpdateEmail from './components/UpdateEmail'

import './Settings.css'

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}

		this.setData = this.setData.bind(this);
		this.refresh_profile = this.refresh_profile.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	setData(data) {
		this.setState({ data })
	}

	refresh_profile() {
		const requestOptions = {
			method: 'GET',
		};
		fetch('/account/myprofile', requestOptions)
			.then(response => response.json())
			.then(data => {
				this.setData(data._data)
			});
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Settings')
			this.props.setPage('Settings');
		this.refresh_profile();
	}

	render() {
		return (
			<div className='intern-page update-form-container'>
				<h2 className='settings-title'>settings</h2>
				<UpdateName data={this.state.data}/>
				<UpdateFirstName data={this.state.data}/>
				<UpdatePassword data={this.state.data}/>
				<UpdateEmail data={this.state.data}/>
			</div>
		);
	}
}

export default Settings;