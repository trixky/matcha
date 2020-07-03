import React, { Component } from 'react'

import './PeopleSelection.css'

class PeopleSelection extends Component {
	constructor(props) {
		super(props);

		this.selectHandle = this.selectHandle.bind(this);
	}

	selectHandle(e) {
		this.props.parent.setState({ selected: e.target.value })
	}

	render() {
		return (
			<div className='people-selection-container'>
				<select onChange={this.selectHandle} className='form-input' name="category" id="category">
					<option value="matched">matched</option>
					<option value="likers">likers</option>
					<option value="liked">liked</option>
					<option value="viewers">viewers</option>
					<option value="blocked">blocked</option>
				</select>
			</div>
		);
	}
}

export default PeopleSelection;
