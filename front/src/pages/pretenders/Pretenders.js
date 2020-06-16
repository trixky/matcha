import React, { Component } from 'react'

class Pretenders extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Pretenders')
			this.props.setPage('Pretenders');
	}

	render() {
		return (
			<div className='intern-page'>
				<p>Pretenders page</p>
			</div>
		);
	}
}

export default Pretenders;
