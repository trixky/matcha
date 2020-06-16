import React, { Component } from 'react'

class Search extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Search')
			this.props.setPage('Search');
	}

	render() {
		return (
			<div className='intern-page'>
				<p>Search page</p>
			</div>
		);
	}
}

export default Search;
