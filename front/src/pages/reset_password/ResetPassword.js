import React, { Component } from 'react'

class ResetPassword extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'ResetPassword')
			this.props.setPage('ResetPassword');
	}

	render() {
		return (
			<div className='intern-page'>
				<p>ResetPassword page</p>
			</div>
		);
	}
}

export default ResetPassword;
