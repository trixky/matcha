import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './Images.css'

class Images extends Component {
	hangleClick(data) {
		if (data) {
			this.props.history.push('/profile/' + data.id + '/gallery');
		}
	}

	render() {
		const default_img = 'https://i7.pngguru.com/preview/906/222/368/computer-icons-user-profile-avatar-french-people.jpg'
		return (
			<div onClick={() => this.hangleClick(this.props.data)} className='profil-img-container'>
				<img className='cercle-img profile-img' src={this.props.data ? this.props.data.profile : default_img} alt='profile' />
				<div className='cercle-img cercle-img-1'></div>
				<div className='cercle-img cercle-img-2'></div>
				<div className='cercle-img cercle-img-3'></div>
			</div>
		);
	}
}

export default withRouter(Images);
