import React, { Component } from 'react'

class Account extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Account')
			this.props.setPage('Account');
	}

	render() {
		return (
			<p>Account page</p>
		);
	}
}

export default Account;
