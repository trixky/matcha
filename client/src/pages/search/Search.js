import React, { Component } from 'react'
import ProfilThumbnail from './components/ProfilThumbnail'

import './Search.css'

class Search extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Search')
			this.props.setPage('Search');
	}

	render() {
		return (
			<div className='intern-page search-container'>
				<ProfilThumbnail />
				<ProfilThumbnail />
				<ProfilThumbnail />
				<ProfilThumbnail />
				<ProfilThumbnail />
				<ProfilThumbnail />
				<ProfilThumbnail />
				<ProfilThumbnail />
				<ProfilThumbnail />
				<ProfilThumbnail />
			</div>
		);
	}
}

export default Search;
