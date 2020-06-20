import React, { Component } from 'react'

import './SearchCriteria.css'

class SearchCriteria extends Component {
	render() {
		return (
			<div className='search-criteria-container'>
				<select className='form-input' name="gender" id="gender">
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
				<select className='form-input' name="orientation" id="orientation">
					<option value="select a distance">select a distance</option>
					<option value="25 km">25 km</option>
					<option value="50 km">50 km</option>
					<option value="100 km">100 km</option>
					<option value="300 km">300 km</option>
					<option value="1000 km">1000 km</option>
					<option value="+ 1000 km">+ 1000 km</option>
				</select>
			</div>
		);
	}
}

export default SearchCriteria;
