import React, { Component } from 'react'

class Visits extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Visits')
			this.props.setPage('Visits');
	}

	render() {
		return (
			<p>Visits page</p>
		)
	}
}

export default Visits;
