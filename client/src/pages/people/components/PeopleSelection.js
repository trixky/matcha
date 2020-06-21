import React, { Component } from 'react'

import './PeopleSelection.css'

class PeopleSelection extends Component {
	render() {
		return (
			<div className='people-selection-container'>
				<select className='form-input' name="category" id="category">
					<option value="matched">matched</option>
					<option value="liker">liker</option>
					<option value="liked">liked</option>
					<option value="viewer">viewer</option>
					<option value="blocker">blocker</option>
					<option value="blocked">blocked</option>
				</select>
			</div>
		);
	}
}

export default PeopleSelection;
