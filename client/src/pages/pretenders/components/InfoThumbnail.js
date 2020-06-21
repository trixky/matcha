import React, { Component } from 'react'

import './InfoThumbnail.css'

class InfoThumbnail extends Component {
	render() {
		return (
			<div className='info-thumbnail'>
				<p><span className='it-genre'>man</span>-<span className='it-orientation'>hetero</span>-<span className='age'>26</span></p>
				<p><span className='it-localisation'>paris</span>-<span className='it-distance'>300km</span></p>
				<p><span className='it-reputation'>6676</span></p>
			</div>
		);
	}
}

export default InfoThumbnail;
