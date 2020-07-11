import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import PeopleSelection from './components/PeopleSelection'
import ProfilThumbnail from '../../shared/components/ProfilThumbnail'

import './People.css'

class People extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'matched',
			profiles: null
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.generateProfile = this.generateProfile.bind(this);
	}

	componentDidMount() {
		if (this.props.readPage() !== 'People')
			this.props.setPage('People');
	}

	generateProfile(selected) {
		let path = '/';

		const _this = this;

		if (selected === 'matched') {
			path += 'matched';
		} else if (selected === 'likers') {
			path += 'liked/likers'
		} else if (selected === 'liked') {
			path += 'liked'
		} else if (selected === 'viewers') {
			path += 'viewers'
		} else if (selected === 'blocked') {
			path += 'blocked'
		}

		const requestOptions = {
			method: 'GET',
		};
		fetch(path, requestOptions)
			.then(response => response.json())
			.then(data => {
				if (data._status === -1) {
					_this.props.history.push('/authentification');
				} else {
					this.setState({ profiles: data._data.map((user, index, array) => (user ? <ProfilThumbnail key={user.id} info={array[index]} /> : null))})
				}
			});
	}

	render() {
		return (
			<div className='intern-page search-container'>
				<PeopleSelection parent={this} />
				<div className='search-carousel-container'>
					{this.state.profiles}
				</div>
			</div>
		);
	}
}

export default withRouter(People);
