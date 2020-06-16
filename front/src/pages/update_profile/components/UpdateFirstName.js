import React, { Component } from 'react'

import './UpdateFirstName.css'

class UpdateFirstName extends Component {
	state = {
		value: 'first name'
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<form>
				<input className='form-input' type='text' placeholder='first name' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' value='update my first name' />
			</form>
		);
	}
}

export default UpdateFirstName;
