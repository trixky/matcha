import React, { Component } from 'react'

import './UpdateFirstName.css'

class UpdateFirstName extends Component {
	constructor(props) {
		super(props);

		this.firstname_fetched = false;

		this.state = {
			value: 'loading...'
		}

		this.handleChange = this.handleChange.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.submitHandle = this.submitHandle.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}
	
	componentDidUpdate() {
		if (this.props.data && this.props.data.firstname && !this.firstname_fetched) {
			this.firstname_fetched = true;
			this.setState({value: this.props.data.firstname})
		}
	}

	submitHandle(e) {
		e.preventDefault();
		
		const body = {
			user: {
				firstname: this.state.value
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
		fetch('/account/myprofile', requestOptions)
		.then((response) => response.json())
		.then(data => {
			console.log(data)
		})
	}

	render() {
		return (
			<form onSubmit={this.submitHandle}>
				<input classfirstname='form-input' type='text' placeholder='firstname' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input classfirstname='form-input auth-submit' type='submit' value='update my firstname' />
				<p classfirstname='update-settings-description'>Your firstname is not visible to other users.</p>
			</form>
		);
	}
}

export default UpdateFirstName;
