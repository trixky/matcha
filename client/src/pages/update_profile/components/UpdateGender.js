import React, { Component } from 'react'

import './UpdateGender.css'

class UpdateGender extends Component {
	render() {
		return (
			<form>
				<select className='form-input' name="gender" id="gender">
					<option value="man">man</option>
					<option value="women">women</option>
					<option value="non binary">non binary</option>
				</select>
				<input className='form-input auth-submit' type='submit' value='update my gender' />
			</form>
		);
	}
}

export default UpdateGender;
