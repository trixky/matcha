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
				0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c				<ProfilThumbnail />
			</div>
		);
	}
}

export default Search;
