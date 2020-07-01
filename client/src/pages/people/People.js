import React, { Component } from 'react'

import ProfilThumbnail from './components/ProfilThumbnail'
import PeopleSelection from './components/PeopleSelection'

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
			path += 'match';
		} else if (selected === 'liker') {
			path += 'liked/liker'
		} else if (selected === 'liked') {
			path += 'liked'
		} else if (selected === 'blocked') {
			path += 'blocked'
		}


		// const _this = this;

		const requestOptions = {
			method: 'GET',
		};
		fetch(path, requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data._data)
				// _this.setState({ data: data._data })
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

export default People;
