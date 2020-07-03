import React, { Component } from 'react'
import ProfilThumbnail from '../../shared/components/ProfilThumbnail'
import SearchCriteria from './components/SearchCriteria'

import './Search.css'

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.refresh_users = this.refresh_users.bind(this);
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Search')
			this.props.setPage('Search');

		this.refresh_users();
	}

	refresh_users() {
		const _this = this;

		const requestOptions = {
			method: 'GET',
		};
		fetch('/search', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data._data)
				_this.setState({ data: data._data })
			});
	}

	render() {
		return (
			<div className='intern-page search-container'>
				<SearchCriteria />
				<div className='search-carousel-container'>
					{this.state.data.map((user, index, array) => (user ? <ProfilThumbnail key={user.id} info={array[index]} /> : null))}
				</div>
				<input className='form-input search-carousel-more-input' type='submit' value='show more profiles' />
			</div>
		);
	}
}

export default Search;
