import React, { Component } from 'react'

import './UpdateBio.css'

class UpdateBio extends Component {
	constructor(props) {
		super(props);
		this.bio_fetched = false;
		this.state = {
			value: 'loading...'
		}

		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidUpdate() {
		if (this.props.data && this.props.data.biography && !this.bio_fetched) {
			this.bio_fetched = true;
			this.setState({value: this.props.data.biography})
		}
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	handleClick(e) {
		e.preventDefault();
		
		const body = {
			user: {
				biography: this.state.value
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
			<form>
				<textarea className='form-input bio-input' type='textarea' placeholder='my bio here...' value={this.state.value} onChange={this.handleChange.bind(this)} />
				<input className='form-input auth-submit' type='submit' onClick={this.handleClick} value='update my bio' />
			</form>
		);
	}
}

export default UpdateBio;
