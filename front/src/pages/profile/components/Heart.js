import React, { Component } from 'react'

import './Heart.css'

class Heart extends Component {
	render() {
		return (
			<div className='heart-container'>
				<div className='profile-heart left-heart scale-hover'>
					<p className='heart-false'><span role='img' aria-label="like">❤️</span></p>
				</div>
				<div className='profile-heart middle-heart'>
					<p className='heart-false'><span role='img' aria-label="mutual like">💕</span></p>
				</div>
				<div className='profile-heart right-heart'>
					<p><span role='img' aria-label="like">❤️</span></p>
				</div>
			</div>
		);
	}
}

export default Heart;


