import React, { Component } from 'react'

import './UpdateLocalisation.css'

class UpdateLocalisation extends Component {
	state = {
		value: 'paris'
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<form>
				<input className='form-input' type='text' placeholder='localisation' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' value='update my localisation' />
			</form>
		);
	}
}

export default UpdateLocalisation;
