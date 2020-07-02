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
		const default_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQH6-1GcLEZB6Z8LleMMZcWDkCincHaLOPlKA&usqp=CAU'
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
