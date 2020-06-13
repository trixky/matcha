import React, { Component } from 'react'

class Notification extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Notification')
			this.props.setPage('Notification');
	}

	render() {
		return (
			<p>Notification page</p>
		);
	}
}

export default Notification;
