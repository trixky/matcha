import React, { Component } from 'react'
import ProfilThumbnail from './components/ProfilThumbnail'
import SearchCriteria from './components/SearchCriteria'

import './Search.css'

class Search extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Search')
			this.props.setPage('Search');
	}

	render() {
		return (
			<div className='intern-page search-container'>
				<SearchCriteria />
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

export default Search;
