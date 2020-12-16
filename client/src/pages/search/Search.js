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
		this.sort_by = undefined;

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

		const body = {
			user: {
				distanceMax: this.distanceMax,
				ageMin: this.ageMin,
				ageMax: this.ageMax,
				repuMin: this.repuMin,
				repuMax: this.repuMax,
				gender: this.gender
			}
		}

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
				<SearchCriteria parent={this} />
				<div className='search-carousel-container'>
					{this.state.data.map((user, index, array) => (user ? <ProfilThumbnail key={user.id} info={array[index]} /> : null))
						.sort((a, b) => {
							if (a && b)
								switch (this.sort_by) {
									case 'age_less':
										return a.props.info.age - b.props.info.age;
									case 'age_more':
										return b.props.info.age - a.props.info.age;
									case 'reputation_less':
										return a.props.info.reputation - b.props.info.reputation;
									case 'reputation_more':
										return b.props.info.reputation - a.props.info.reputation;
									case 'distance_less':
										return a.props.info.distance - b.props.info.distance;
									case 'distance_more':
										return b.props.info.distance - a.props.info.distance;
									default:
										break;
								}
							return true;
						})}
				</div>
			</div>
		);
	}
}

export default withRouter(Search);
