import React, { Component } from 'react'

import './UpdateName.css'

class UpdateName extends Component {
	constructor(props) {
		super(props);

		this.name_fetched = false;

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
		if (this.props.data && this.props.data.name && !this.name_fetched) {
			this.name_fetched = true;
			this.setState({value: this.props.data.name})
		}
	}

	submitHandle(e) {
		e.preventDefault();
		
		const body = {
			user: {
				name: this.state.value
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
	}

	render() {
		return (
			<form onSubmit={this.submitHandle}>
				<input className='form-input' type='text' placeholder='name' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' value='update my name' />
				<p className='update-settings-description'>Your name is not visible to other users.</p>
			</form>
		);
	}
}

export default UpdateName;
