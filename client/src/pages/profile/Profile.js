import React, { Component } from 'react'

import './Profile.css'

import Images from './components/Images'
import ProfileListInfo from './components/ProfileListInfo'
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
		const data = this.state.data;
		return (
			<div className='intern-page profile-container'>
				<h2 className='profil-title'>{data ? data.username : 'loading...'}</h2>
				<h3 className='connection-status'>{data ? data.connected ? 'connected' : data.updated : 'loading...'}</h3>
				<div className='profile-info-container'>
					<Images data={data} />
					<input className='form-input' onClick={() => (this.handleClick('/profile'))} type='submit' value='chat' disabled />
					<ProfileListInfo data={data} />
					<Bio data={data} />
					<Tags data={data} />
				</div>
			</div>
		);
	}
}

export default Profile;
