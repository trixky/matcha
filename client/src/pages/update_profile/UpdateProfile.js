import React, { Component } from 'react'

import UpdateUsername from './components/UpdateUsername'
import UpdateGallery from './components/UpdateGallery'
import UpdateGender from './components/UpdateGender'
import UpdateOrientation from './components/UpdateOrientation'
import UpdateBirthday from './components/UpdateBirthday'
import UpdateLocalisation from './components/UpdateLocalisation'
import UpdateBio from './components/UpdateBio'
import UpdateTags from './components/UpdateTags'

import './UpdateProfile.css'

class UpdateProfile extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'UpdateProfile')
			this.props.setPage('UpdateProfile');
	}

	render() {
		return (
			<div className='intern-page update-form-container'>
				<h2 className='update-profile-title'>update my profile</h2>
				<UpdateUsername />
				<UpdateGallery />
				<UpdateGender />
				<UpdateOrientation />
				<UpdateBirthday />
				<UpdateLocalisation />
				<UpdateBio />
				<UpdateTags />
			</div>
		);
	}
}

export default UpdateProfile;
