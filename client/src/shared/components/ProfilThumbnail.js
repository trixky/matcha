import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import InfoThumbnail from './InfoThumbnail'

import './ProfilThumbnail.css'

class ProfilThumbnail extends Component {
	constructor(props) {
		super(props);
	}

	handleClick(url) {
		this.props.history.push(url);
	}

	render() {
		const info = this.props.info;
		console.log(info)
		return (
			<div className='profil-thumbnail-container' onClick={() => (this.handleClick('/profile/' + info.id))}>
				<img src={info.profile} alt='profile' />				
				<h2>{info.username}</h2>
				<InfoThumbnail info={info} />
			</div>
		);
	}
}

export default withRouter(ProfilThumbnail);
