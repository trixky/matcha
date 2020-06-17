import React, { Component } from 'react'

import './UpdateOrientation.css'

class UpdateOrientation extends Component {
	render() {
		return (
			<form>
				<select className='form-input' name="orientation" id="orientation">
					<option value="heterosexual">heterosexual</option>
					<option value="homosexual">homosexual</option>
					<option value="bisexual">bisexual</option>
				</select>
				<input className='form-input auth-submit' type='submit' value='update my orientation' />
			</form>
		);
	}
}

export default UpdateOrientation;
