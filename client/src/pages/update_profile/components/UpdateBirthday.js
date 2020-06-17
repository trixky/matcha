import React, { Component } from 'react'

import './UpdateBirthday.css'

class UpdateBirthday extends Component {
	state = {
		value: '1999-12-13'
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<form>
				<input className='form-input' type='date' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' value='update my birthday' />
			</form>
		);
	}
}

export default UpdateBirthday;
