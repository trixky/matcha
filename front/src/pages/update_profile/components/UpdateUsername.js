import React, { Component } from 'react'

import './UpdateUsername.css'

class UpdateUsername extends Component {
	state = {
		value: 'username'
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<form>
				<input className='form-input' type='text' placeholder='username' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' value='update my username' />
			</form>
		);
	}
}

export default UpdateUsername;
