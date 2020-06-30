import React, { Component } from 'react'

import './UpdateOrientation.css'

class UpdateOrientation extends Component {
	constructor(props) {
		super(props);

		this.orientation_fetched = false;

		this.state = {
			value: 'loading'
		}

		this.handleClick = this.handleClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	componentDidUpdate() {
		if (this.props.data && this.props.data.orientation && !this.orientation_fetched) {
			this.orientation_fetched = true;
			this.setState({ value: this.props.data.orientation })
		}
	}

	handleClick(e) {
		e.preventDefault();
		
		const body = {
			user: {
				orientation: this.state.value
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
				<select className='form-input' name="orientation" id="orientation" value={this.state.value} onChange={this.onChange}>
					<option value="heterosexual">heterosexual</option>
					<option value="homosexual">homosexual</option>
					<option value="bisexual">bisexual</option>
				</select>
				<input className='form-input auth-submit' type='submit' onClick={this.handleClick} value='update my orientation' />
			</form>
		);
	}
}

export default UpdateOrientation;
