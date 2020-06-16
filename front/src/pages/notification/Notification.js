import React, { Component } from 'react'

class Notification extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Notification')
			this.props.setPage('Notification');
	}

	render() {
		return (
			<div className='intern-page'>
				<p>Notification page</p>
			</div>
		);
	}
}

export default Notification;
