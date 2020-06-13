import React, { Component } from 'react'

class Search extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Search')
			this.props.setPage('Search');
	}

	render() {
		return (
			<p>Search page</p>
		);
	}
}

export default Search;
