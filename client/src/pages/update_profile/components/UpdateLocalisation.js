import React, { Component } from 'react'

import './UpdateLocalisation.css'

class UpdateLocalisation extends Component {
	state = {
		value: 'paris'
	}

	handleChange(event) {
		this.setState({ value: event.target.value })
	}

	showPosition(position) {
		console.log('asdfasdf')
		console.log(position)
	}

	componentDidMount() {
		if ("geolocation" in navigator) {
			console.log("Available");
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log("Latitude is :", position.coords.latitude);
				console.log("Longitude is :", position.coords.longitude);
			});
		} else {
			console.log("Not Available");
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
