import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import ProfilThumbnail from '../../shared/components/ProfilThumbnail'
import SearchCriteria from './components/SearchCriteria'

import './Search.css'

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}

		this.distanceMax = undefined;
		this.ageMin = undefined;
		this.ageMax = undefined;
		this.repuMin = undefined;
		this.repuMax = undefined;
		this.gender = undefined;

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

		let url = '/search?';

		const body = {user: {
			distanceMax: this.distanceMax,
			ageMin: this.ageMin,
			ageMax: this.ageMax,
			repuMin: this.repuMin,
			repuMax: this.repuMax,
			gender: this.gender
		}}

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		};
		fetch(url, requestOptions)
			.then(response => response.json())
			.then(data => {
				if (data._status === -1) {
					_this.props.history.push('/authentification');
				} else {
					_this.setState({ data: data._data })
				}
			});
	}

	render() {
		return (
			<div className='intern-page search-container'>
				<SearchCriteria parent={this}/>
				<div className='search-carousel-container'>
					{this.state.data.map((user, index, array) => (user ? <ProfilThumbnail key={user.id} info={array[index]} /> : null))}
				</div>
			</div>
		);
	}
}

export default withRouter(Search);
