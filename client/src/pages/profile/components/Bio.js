import React, { Component } from 'react'

import './Bio.css'

class Bio extends Component {
	render() {
		let bio = 'loading...'
		if (this.props.data) {
			bio = this.props.data.biography
		}
		return (
			<div className='bio-container'>
				<p>{bio}</p>
			</div>
		);
	}
}

export default Bio;
