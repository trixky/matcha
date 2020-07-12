import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom';

import './Profile.css'

import Images from './components/Images'
import ProfileListInfo from './components/ProfileListInfo'
import Bio from './components/Bio'
import Tags from './components/Tags'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Profile extends Component {
	state = {
		data: null,
		like_button: 'loading...',
		chat_button: 'loading...',
		block_button: 'loading...'
	}

	componentDidMount() {
		const _this = this;

		if (this.props.readPage() !== 'Profile')
			this.props.setPage('Profile');

		const current_user = window.location.pathname.split('/')[2];
		const requestOptions = {
			method: 'GET',
		};
		fetch('/account/' + current_user, requestOptions)
			.then(response => response.json())
			.then(data => {
				if (data._status === -1) {
					_this.props.history.push('/authentification');
				} else {

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
				}
			});
	}

	handleLikeButton() {
		const like_button = this.state.like_button;
		const body = JSON.stringify({ user: { username: this.state.data.username } });
		const headers = { 'Content-Type': 'application/json' }

		if (like_button === 'like') {
			this.setState({ like_button: 'unlike' })
			const requestOptions = {
				method: 'POST',
				headers,
				body
			};
			fetch('/liked', requestOptions)
				.then(response => response.json())
				.then(data => {
					if (data._status === -1) {
						alert(data._data)
						this.setState({ like_button: 'like' })
					}
				});
		} else if (like_button === 'unlike') {
			this.setState({ like_button: 'like' })
			const requestOptions = {
				method: 'PUT',
				headers,
				body
			};
			fetch('/liked', requestOptions)
				.then(response => response.json())
				.then(data => {
					if (data._status === -1) {
						alert(data._data)
						this.setState({ like_button: 'unlike' })
					}
				});
		}
	}

	handleBlockButton() {
		const block_button = this.state.block_button;
		const body = JSON.stringify({ user: { username: this.state.data.username } });
		const headers = { 'Content-Type': 'application/json' }

		if (block_button === 'block') {
			this.setState({ block_button: 'unblock' })
			const requestOptions = {
				method: 'POST',
				headers,
				body
			};
			fetch('/blocked', requestOptions)
		} else if (block_button === 'unblock') {
			this.setState({ block_button: 'block' })
			const requestOptions = {
				method: 'PUT',
				headers,
				body
			};
			fetch('/blocked', requestOptions)
		}
	}

	handleChatButton() {
		const data = this.state.data
		if (data) {
			this.props.history.push('/chat/' + data.username);
		}
	}

	handleReportButton() {
		const body = JSON.stringify({ user: { username: this.state.data.username } });
		const headers = { 'Content-Type': 'application/json' }

		const requestOptions = {
			method: 'POST',
			headers,
			body
		};
		fetch('/fake', requestOptions)
	}

	inputsGenerator() {
		if (this.state.data && this.state.data.id !== cookies.get('my_id')) {
			return (
				<Fragment>
					<input className='form-input' onClick={() => (this.handleLikeButton())} type='submit' value={this.state.like_button} disabled={this.state.like_button === 'loading...' || this.state.block_button === 'unblock'} />
					<input className='form-input' onClick={() => (this.handleBlockButton())} type='submit' value={this.state.block_button} />
					<input className='form-input' onClick={() => (this.handleChatButton())} type='submit' value='chat' disabled={!this.state.chat_button} />
					<input className='form-input' onClick={() => (this.handleReportButton())} type='submit' value='report' />
				</Fragment>
			)
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
					{this.inputsGenerator()}
				</div>
			</div>
		);
	}
}

export default withRouter(Profile);
