import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './Images.css'

class Images extends Component {
	hangleClick(url) {
		console.log('test')
		this.props.history.push(url);
	}

	render() {
		return (
			<div onClick={() => this.hangleClick('/profile/username/gallery')} className='profil-img-container'>
				<img className='cercle-img profile-img' src={'https://images.theconversation.com/files/312307/original/file-20200128-81416-1bjupq6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'} alt='profile' />
				<div className='cercle-img cercle-img-1'></div>
				<div className='cercle-img cercle-img-2'></div>
				<div className='cercle-img cercle-img-3'></div>
			</div>
		);
	}
}

export default withRouter(Images);
