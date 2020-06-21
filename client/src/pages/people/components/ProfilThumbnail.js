import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import InfoThumbnail from './InfoThumbnail'

import './ProfilThumbnail.css'

class ProfilThumbnail extends Component {
	handleClick(url) {
		this.props.history.push(url);
	}

	render() {
		return (
			<div className='profil-thumbnail-container' onClick={() => (this.handleClick('/profile/username'))}>
				<img src={'https://images.theconversation.com/files/312307/original/file-20200128-81416-1bjupq6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'} alt='profile' />				
				<h2>username</h2>
				<InfoThumbnail />
			</div>
		);
	}
}

export default withRouter(ProfilThumbnail);
