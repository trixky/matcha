import React, { Component } from 'react'

import './UpdateBio.css'

class UpdateBio extends Component {
	state = {
		value: 'my bio here...'
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<form>
				<textarea className='form-input bio-input' type='textarea' placeholder='bio' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' value='update my bio' />
			</form>
		);
	}
}

export default UpdateBio;
