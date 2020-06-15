import React, { Component } from 'react'
import './Profile.css'

import Images from './components/Images'
import ProfileListInfo from './components/ProfileListInfo'
import Heart from './components/Heart'
import Bio from './components/Bio'

class Profile extends Component {

	componentDidMount() {
		if (this.props.readPage() !== 'Profile')
			this.props.setPage('Profile');
	}

	render() {
		return (
			<div className='intern-page profile-container'>
				<h2 className='profil-title'>username</h2>
				<h3 className='connection-status'>connected</h3>
				<div className='profile-info-container'>
					<Images />
					<Heart />
					<input className='form-input' onClick={() => (this.handleClick('/profile'))} type='submit' value='chat' disabled />
					<ProfileListInfo />
					<Bio />
				</div>
			</div>
		);
	}
}

export default Profile;
