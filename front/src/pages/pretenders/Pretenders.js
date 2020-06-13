import React, { Component } from 'react'

class Pretenders extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Pretenders')
			this.props.setPage('Pretenders');
	}

	render() {
		return (
			<p>Pretenders page</p>
		);
	}
}

export default Pretenders;
