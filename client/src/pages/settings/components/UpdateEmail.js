import React, { Component } from 'react'

import './UpdateEmail.css'

class UpdateEmail extends Component {
	constructor(props) {
		super(props);

		this.email_fetched = false;

		this.state = {
			value: 'loading...',
			email_err_message: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.submitHandle = this.submitHandle.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}
	
	componentDidUpdate() {
		if (this.props.data && this.props.data.email && !this.email_fetched) {
			this.email_fetched = true;
			this.setState({value: this.props.data.email})
		}
	}

	submitHandle(e) {
		e.preventDefault();
		const _this = this;

		const body = {
			user: {
				email: this.state.value
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
			if (data._status === -1) {
				_this.setState({email_err_message: data._data.email})
			} else {
				_this.setState({email_err_message: ''})
				alert('your email has been successfully updated')
			}
		})
	}

	render() {
		const email_err_message = this.state.email_err_message;
		return (
			<form onSubmit={this.submitHandle}>
				{email_err_message !== '' ? <p className={`error-input setting-input on`}>Invalid email:<br /><span>{email_err_message}</span></p> : null}
				<input className='form-input' type='email' placeholder='new email' value={this.state.value} onChange={this.handleChange.bind(this)} required />
				<input className='form-input auth-submit' type='submit' value='update my email' />
				{/* <p className='update-settings-description'>Once your new email confirm, your old email will be obsolete.</p> */}
			</form>
		);
	}
}

export default UpdateEmail;
