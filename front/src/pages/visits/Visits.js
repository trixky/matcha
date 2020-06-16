import React, { Component } from 'react'

class Visits extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Visits')
			this.props.setPage('Visits');
	}

	render() {
		return (
			<div className='intern-page'>
				<p>Visits page</p>
			</div>
		)
	}
}

export default Visits;
