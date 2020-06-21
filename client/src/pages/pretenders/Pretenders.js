import React, { Component } from 'react'

import ProfilThumbnail from './components/ProfilThumbnail'
import PeopleSelection from './components/PeopleSelection'

import './Pretenders.css'

class Pretenders extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Pretenders')
			this.props.setPage('Pretenders');
	}

	render() {
		return (
			<div className='intern-page search-container'>
				<PeopleSelection />
				<div className='search-carousel-container'>
					<ProfilThumbnail />
					<ProfilThumbnail />
					<ProfilThumbnail />
					<ProfilThumbnail />
					<ProfilThumbnail />
					<ProfilThumbnail />
					<ProfilThumbnail />
					<ProfilThumbnail />
				</div>
				<input className='form-input search-carousel-more-input' type='submit' value='show more profiles' />
			</div>
		);
	}
}

export default Pretenders;
