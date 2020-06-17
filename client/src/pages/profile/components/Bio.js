import React, { Component } from 'react'

import './Bio.css'

class Bio extends Component {
	render() {
		const bio = 'I am a simple gardener, I particularly like the sweet mint and my wheelbarrow'
		return (
			<div className='bio-container'>
				<p>{bio}</p>
			</div>
		);
	}
}

export default Bio;
