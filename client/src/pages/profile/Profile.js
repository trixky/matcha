import React, { Component } from 'react'

import './Profile.css'

import Images from './components/Images'
import ProfileListInfo from './components/ProfileListInfo'
import Bio from './components/Bio'
import Tags from './components/Tags'

class Profile extends Component {
	state = {
		data: null,
		like_button: 'loading...',
		chat_button: 'loading...',
		block_button: 'loading...'
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

				const relation = data._data.relation
				if (!relation) {
					this.setState({ like_button: 'like', chat_button: false, block_button: 'block' })
				} else if (relation === 'matched') {
					this.setState({ like_button: 'unlike', chat_button: true, block_button: 'block' })
				} else if (relation === 'liked') {
					this.setState({ like_button: 'unlike', chat_button: false, block_button: 'block' })
				} else if (relation === 'blocked') {
					this.setState({ like_button: 'like', chat_button: false, block_button: 'unblock' })
				}
			});
	}

	handleLikeButton() {
		const body = JSON.stringify({user: { username: this.state.data.username }});
		const like_button = this.state.like_button;

		if (like_button === 'like') {
			const requestOptions = {
				method: 'POST',
				body
			};
			console.log(requestOptions)
			fetch('/liked', requestOptions)
				.then(response => response.json())
				.then(data => {
					console.log(data)
				});
		} else if (like_button === 'unlike') {
			const requestOptions = {
				method: 'PUT',
				body
			};
			fetch('/liked', requestOptions)
				.then(response => response.json())
				.then(data => {
					console.log(data)
				});
		}
	}

	handleBlockButton() {
		const body = JSON.stringify({user: { username: this.state.data.username }});
		const block_button = this.state.block_button;

		if (block_button === 'block') {
			const requestOptions = {
				method: 'POST',
				body
			};
			console.log(requestOptions)
			fetch('/blocked', requestOptions)
				.then(response => response.json())
				.then(data => {
					console.log(data)
				});
		} else if (block_button === 'unblock') {
			const requestOptions = {
				method: 'PUT',
				body
			};
			fetch('/blocked', requestOptions)
				.then(response => response.json())
				.then(data => {
					console.log(data)
				});
		}
	}

	render() {
		const data = this.state.data;
		return (
			<div className='intern-page profile-container'>
				<h2 className='profil-title'>{data ? data.username : 'loading...'}</h2>
				<h3 className='connection-status'>{data ? data.connected ? 'connected' : data.updated : 'loading...'}</h3>
				<div className='profile-info-container'>
					<Images data={data} />
					<ProfileListInfo data={data} />
					<Bio data={data} />
					<Tags data={data} />
					<input className='form-input' onClick={() => (this.handleLikeButton('/profile'))} type='submit' value={this.state.like_button} disabled={this.state.like_button === 'loading...' || this.state.block_button === 'unblock'} />
					<input className='form-input' onClick={() => (this.handleLikeButton('/profile'))} type='submit' value={this.state.block_button} />
					<input className='form-input' onClick={() => (this.handleLikeButton('/profile'))} type='submit' value='chat' disabled={!this.state.chat_button} />
				</div>
			</div>
		);
	}
}

export default Profile;
