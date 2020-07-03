import React, { Component } from 'react'

import './InfoThumbnail.css'

class InfoThumbnail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const info = this.props.info;
		return (
			<div className='info-thumbnail'>
				<p><span className='it-genre'>{info.gender}</span>-<span className='it-orientation'>{info.orientation}</span>-<span className='age'>{info.age}</span></p>
				<p><span className='it-localisation'>{info.distance + ' km'}</span></p>
				<p><span className='it-reputation'>{info.reputation + ' ⭐'}</span></p>
			</div>
		);
	}
}

export default InfoThumbnail;
