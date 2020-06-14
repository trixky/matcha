import React, { Component } from 'react'

class ResetPassword extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'ResetPassword')
			this.props.setPage('ResetPassword');
	}

	render() {
		return (
			<p>ResetPassword page</p>
		);
	}
}

export default ResetPassword;
