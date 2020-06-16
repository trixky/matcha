import React, { Component } from 'react'

import './UpdateName.css'

class UpdateName extends Component {
	state = {
		value: 'name'
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}
	
	render() {
		return (
			<form>
				<input className='form-input' type='text' placeholder='name' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' value='update my name' />
			</form>
		);
	}
}

export default UpdateName;
