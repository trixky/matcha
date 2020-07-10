import React, { Component } from 'react'

import './SearchCriteria.css'

class SearchCriteria extends Component {
	constructor(props) {
		super(props);

		this.handleGender = this.handleGender.bind(this);
		this.handleDistance = this.handleDistance.bind(this);
	}

	handleGender(event) {
		const value = event.currentTarget.value;
		
		if (value === 'select a gender') {
			this.props.parent.gender = undefined
		} else {
			this.props.parent.gender = event.currentTarget.value
		}
		this.props.parent.refresh_users()
	}

	handleDistance(event) {
		const value = event.currentTarget.value;
		
		if (value === 'select a distance') {
			this.props.parent.distanceMax = undefined
		} else {
			this.props.parent.distanceMax = parseInt(event.currentTarget.value, 10)
		}
		this.props.parent.refresh_users()
	}

	render() {
		return (
			<div className='search-criteria-container'>
				<select onChange={this.handleGender} className='form-input' name="gender" id="gender">
					<option value="select a gender">select a gender</option>
					<option value="man">man</option>
					<option value="women">women</option>
					<option value="non binary">non binary</option>
				</select>
				<select className='form-input' name="orientation" id="orientation">
					<option value="select an orientation">select an orientation</option>
					<option value="heterosexual">heterosexual</option>
					<option value="homosexual">homosexual</option>
					<option value="bisexual">bisexual</option>
				</select>
				<select className='form-input' name="orientation" id="orientation">
					<option value="select an age slice">select an age slice</option>
					<option value="18 - 25">18 - 25</option>
					<option value="20 - 25">20 - 25</option>
					<option value="25 - 30">25 - 30</option>
					<option value="30 - 35">30 - 35</option>
					<option value="35 - 40">35 - 40</option>
					<option value="40 - 50">40 - 50</option>
					<option value="+ 50">+ 50</option>
				</select>
				<select onChange={this.handleDistance} className='form-input' name="orientation" id="orientation">
					<option value="select a distance">select a distance</option>
					<option value="25">25 km</option>
					<option value="50">50 km</option>
					<option value="100">100 km</option>
					<option value="300">300 km</option>
					<option value="1000">1000 km</option>
					<option value="3000">3000 km</option>
				</select>
			</div>
		);
	}
}

export default SearchCriteria;
