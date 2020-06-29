import React, { Component } from 'react'

import './UpdateUsername.css'

class UpdateUsername extends Component {
	constructor(props) {
		super(props);

		this.username_fetched = false;

		this.state = {
			value: 'loading...'
		}

		this.handleChange = this.handleChange.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value })
	}

	componentDidUpdate() {
		if (this.props.data && this.props.data.username && !this.username_fetched) {
			this.username_fetched = true;
			this.setState({value: this.props.data.username})
		}
	}

	handleClick(e) {
		e.preventDefault();
		
		const body = {
			user: {
				username: this.state.value
			}
		}

		console.log(body)

		const requestOptions = {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		};
		fetch('/account/myprofile', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log('cest bon')
				console.log(data)
		});
	}

	render() {
		return (
			<form>
				<input className='form-input' type='text' placeholder='username' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' onClick={this.handleClick} value='update my username' />
			</form>
		);
	}
}

export default UpdateUsername;
