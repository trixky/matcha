import React, { Component } from 'react'

// import ProfilThumbnail from './components/ProfilThumbnail'
import PeopleSelection from './components/PeopleSelection'
import ProfilThumbnail from '../../shared/components/ProfilThumbnail'

import './People.css'

class People extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'matched'
		}
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		if (this.props.readPage() !== 'People')
			this.props.setPage('People');
	}

	generateProfile() {
		const selected = this.state.selected;
		let path = '/';

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
				console.log(data)
				return (data._data.map((value) => <ProfilThumbnail info={value} />))
			});
	}

	render() {
		console.log('toupitoupi')
		console.log(this.state.selected)
		return (
			<div className='intern-page search-container'>
				<PeopleSelection parent={this} />
				<div className='search-carousel-container'>
					{this.generateProfile()}
				</div>
				<input className='form-input search-carousel-more-input' type='submit' value='show more profiles' />
			</div>
		);
	}
}

export default People;
