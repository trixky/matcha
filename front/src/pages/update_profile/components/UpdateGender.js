import React, { Component } from 'react'

import './UpdateGender.css'

class UpdateGender extends Component {
	render() {
		return (
			<form>
				<select className='form-input' name="gender" id="gender">
					<option value="heterosexual">man</option>
					<option value="homosexual">women</option>
					<option value="bisexual">non binary</option>
				</select>
				<input className='form-input auth-submit' type='submit' value='update my gender' />
			</form>
		);
	}
}

export default UpdateGender;
