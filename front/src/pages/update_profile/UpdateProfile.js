import React, { Component } from 'react'

import './UpdateProfile.css'

class UpdateProfile extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'UpdateProfile')
			this.props.setPage('UpdateProfile');
	}


	render() {
		return (
			<div className='intern-page update-profile-container'>
				<h2 className='update-profile-title'>update my profile</h2>
				<form>
					<input className='form-input' type='text' placeholder='username' value='username' />
					<input className='form-input auth-submit' type='submit' value='update my username' />
				</form>
				<form>
					<input className='form-input' type='text' placeholder='name' value='name' />
					<input className='form-input auth-submit' type='submit' value='update my name' />
				</form>
				<form>
					<input className='form-input' type='text' placeholder='first name' value='first name' />
					<input className='form-input auth-submit' type='submit' value='update my first name' />
				</form>
				<hr />
				<form>
					<input className='form-input' type='text' placeholder='profile picture' value='profile picture' />
					<input className='form-input auth-submit' type='submit' value='update my profile picture' />
				</form>
				<form>
					<input className='form-input' type='text' placeholder='seconde picture' value='seconde picture' />
					<input className='form-input auth-submit' type='submit' value='update my seconde picture' />
				</form>
				<form>
					<input className='form-input' type='text' placeholder='add a third picture' value='add a third picture' />
					<input className='form-input auth-submit' type='submit' value='add a third picture' />
				</form>
				<hr />
				<form>
				<select className='form-input' name="gender" id="gender">
						<option value="heterosexual">man</option>
						<option value="homosexual">women</option>
						<option value="bisexual">non binary</option>
					</select>
					<input className='form-input auth-submit' type='submit' value='update my gender' />
				</form>
				<form>
					<select className='form-input' name="orientation" id="orientation">
						<option value="heterosexual">heterosexual</option>
						<option value="homosexual">homosexual</option>
						<option value="bisexual">bisexual</option>
					</select>
					<input className='form-input auth-submit' type='submit' value='update my orientation' />
				</form>
				<form>
					<input className='form-input' type='date' />
					<input className='form-input auth-submit' type='submit' value='update my birthday' />
				</form>
				<form>
					<input className='form-input' type='text' placeholder='localisation' value='localisation' />
					<input className='form-input auth-submit' type='submit' value='update my localisation' />
				</form>
				<form>
					<textarea className='form-input' type='textarea' placeholder='bio' value='bio' />
					<input className='form-input auth-submit' type='submit' value='update my bio' />
				</form>
				<form>
					<input className='form-input' type='text' placeholder='#tag' />
					<input className='form-input auth-submit' type='submit' value='add a tag' />
				</form>
			</div>
		);
	}
}

export default UpdateProfile;
