import React, { Component } from 'react'

import './UpdateLocalisation.css'

class UpdateLocalisation extends Component {
	constructor(props) {
		super(props);

		this.SubmitHandle = this.SubmitHandle.bind(this);
	}

	SubmitHandle(e) {
		e.preventDefault();
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log("Latitude is :", position.coords.latitude);
				console.log("Longitude is :", position.coords.longitude);

				const body = {
					user: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}
				}
				const requestOptions = {
					method: 'PUT',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body)
				};
				fetch('/account/myprofile', requestOptions);
			});
		}
	}

	render() {
		return (
			<form onSubmit={this.SubmitHandle}>
				<input className='form-input auth-submit' type='submit' value={'update my localisation'} />
			</form>
		);
	}
}

export default UpdateLocalisation;
