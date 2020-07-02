import React, { Component } from 'react'

import './Profile.css'

import Images from './components/Images'
import ProfileListInfo from './components/ProfileListInfo'
import Heart from './components/Heart'
import Bio from './components/Bio'
import Tags from './components/Tags'

class Profile extends Component {
	state = {
		data: null
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Profile')
			this.props.setPage('Profile');

		const current_user = window.location.pathname.split('/')[2];
		// const body = { _data: { username: current_user } }

		const requestOptions = {
			method: 'GET',
			// body
		};
		fetch('/account/' + current_user, requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				this.setState({ data: data._data })
			});
	}

	render() {
		return (
			<div className='intern-page profile-container'>
				<h2 className='profil-title'>username</h2>
				<h3 className='connection-status'>connected</h3>
				<div className='profile-info-container'>
					<Images data={this.state.data} />
					<Heart data={this.state.data} />
					<input className='form-input' onClick={() => (this.handleClick('/profile'))} type='submit' value='chat' disabled />
					<ProfileListInfo data={this.state.data} />
					<Bio data={this.state.data} />
					<Tags data={this.state.data} />
				</div>
			</div>
		);
	}
}

export default Profile;
