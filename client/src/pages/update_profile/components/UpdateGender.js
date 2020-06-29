import React, { Component } from 'react'

import './UpdateGender.css'

class UpdateGender extends Component {
	constructor(props) {
		super(props);

		this.gender_fetched = false;

		this.state = {
			value: 'loading'
		}

		this.handleClick = this.handleClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	componentDidUpdate() {
		if (this.props.data && this.props.data.gender && !this.gender_fetched) {
			this.gender_fetched = true;
			this.setState({ value: this.props.data.gender })
		}
	}

	handleClick(e) {
		e.preventDefault();
		
		const body = {
			user: {
				gender: this.state.value
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

	onChange(e) {
		this.setState({ value: e.target.value })
	}

	render() {
		return (
			<form>
				<select className='form-input' name="gender" id="gender" value={this.state.value} onChange={this.onChange}>
					<option value="man">man</option>
					<option value="women">women</option>
					<option value="non binary">non binary</option>
				</select>
				<input className='form-input auth-submit' type='submit' onClick={this.handleClick} value='update my gender' />
			</form>
		);
	}
}

export default UpdateGender;
