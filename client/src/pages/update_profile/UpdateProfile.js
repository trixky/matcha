import React, { Component } from 'react'

import UpdateUsername from './components/UpdateUsername'
import UpdateGallery from './components/UpdateGallery'
import UpdateGender from './components/UpdateGender'
import UpdateOrientation from './components/UpdateOrientation'
import UpdateBirthday from './components/UpdateBirthday'
import UpdateBio from './components/UpdateBio'
import UpdateTags from './components/UpdateTags'

import './UpdateProfile.css'

class UpdateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
		this.refresh_profile = this.refresh_profile.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	refresh_profile() {
		const requestOptions = {
			method: 'GET',
		};
		fetch('/account/myprofile', requestOptions)
			.then(response => response.json())
			.then(data => {
				this.setState({ data: data._data })
			});
	}

	componentDidMount() {
		if (this.props.readPage() !== 'UpdateProfile')
			this.props.setPage('UpdateProfile');
		this.refresh_profile();
	}

	render() {
		return (
			<div className='intern-page update-form-container'>
				<h2 className='update-profile-title'>update my profile</h2>
				<UpdateUsername data={this.state.data} />
				<UpdateGallery data={this.state.data} />
				<UpdateGender data={this.state.data} />
				<UpdateOrientation data={this.state.data} />
				<UpdateBirthday data={this.state.data} />
				<UpdateBio data={this.state.data} />
				<UpdateTags data={this.state.data} />
			</div>
		);
	}
}

export default UpdateProfile;
