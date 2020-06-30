import React, { Component } from 'react'

import './UpdateBirthday.css'

class UpdateBirthday extends Component {
	constructor(props) {
		super(props);

		this.birthday_fetched = false;

		this.state = {
			value: '2000-00-00'
		}

		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidUpdate() {
		if (this.props.data && this.props.data.birthday && !this.birthday_fetched) {
			this.birthday_fetched = true;
			this.setState({ value: this.props.data.birthday })
		}
	}

	handleClick(e) {
		e.preventDefault();
		
		const body = {
			user: {
				birthday: this.state.value
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

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<form>
				<input className='form-input' type='date' value={this.state.value} onChange={this.handleChange} />
				<input className='form-input auth-submit' type='submit' onClick={this.handleClick} value='update my birthday' />
			</form>
		);
	}
}

export default UpdateBirthday;
