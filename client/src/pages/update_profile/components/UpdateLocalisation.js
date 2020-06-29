import React, { Component } from 'react'

import './UpdateLocalisation.css'

class UpdateLocalisation extends Component {
	state = {
		value: 'paris'
	}

	handleChange(event) {
		this.setState({ value: event.target.value })
	}

	componentDidMount() {
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
			<form>
				<input className='form-input' type='text' placeholder='localisation' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' value='update my localisation' />
				<div id="map"></div>
			</form >
		);
	}
}

export default UpdateLocalisation;
