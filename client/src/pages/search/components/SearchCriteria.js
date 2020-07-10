import React, { Component } from 'react'

import './SearchCriteria.css'

class SearchCriteria extends Component {
	constructor(props) {
		super(props);

		this.handleGender = this.handleGender.bind(this);
		this.handleDistance = this.handleDistance.bind(this);
		this.handleAge = this.handleAge.bind(this);
		this.handleReputation = this.handleReputation.bind(this);
	}

	handleGender(event) {
		const value = event.currentTarget.value;
		
		if (value === 'select a gender') {
			this.props.parent.gender = undefined
		} else {
			this.props.parent.gender = value
		}
		this.props.parent.refresh_users()
	}

	handleDistance(event) {
		const value = event.currentTarget.value;
		
		if (value === 'select a distance') {
			this.props.parent.distanceMax = undefined
		} else {
			this.props.parent.distanceMax = parseInt(value, 10)
		}
		this.props.parent.refresh_users()
	}
	
	handleReputation(event) {
		const value = event.currentTarget.value;
		
		if (value === 'select a reputation') {
			this.props.parent.repuMin = undefined
		} else {
			this.props.parent.repuMin = parseInt(value, 10)
		}
		this.props.parent.refresh_users()
	}

	handleAge(event) {
		const value = event.currentTarget.value;
		
		if (value === 'select an age slice') {
			this.props.parent.ageMin = undefined
			this.props.parent.ageMax = undefined
		} else {
			this.props.parent.ageMin = parseInt(value.slice(0, 2), 10)
			this.props.parent.ageMax = parseInt(value.slice(5, 8), 10)
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
				<select onChange={this.handleAge} className='form-input' name="age" id="age">
					<option value="select an age slice">select an age slice</option>
					<option value="18 - 25">18 - 25</option>
					<option value="20 - 25">20 - 25</option>
					<option value="25 - 30">25 - 30</option>
					<option value="30 - 35">30 - 35</option>
					<option value="35 - 40">35 - 40</option>
					<option value="40 - 50">40 - 50</option>
					<option value="50 - 99">40 - 50</option>
				</select>
				<select onChange={this.handleReputation} className='form-input' name="reputation" id="reputation">
					<option value="select a reputation">select a reputation</option>
					<option value="50">+ 50</option>
					<option value="100">+ 100</option>
					<option value="200">+ 200</option>
					<option value="500">+ 500</option>
					<option value="1000">+ 1000</option>
					<option value="3000">+ 3000</option>
					<option value="10000">+ 10000</option>
				</select>
				<select onChange={this.handleDistance} className='form-input' name="distance" id="distance">
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
