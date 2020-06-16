import React, { Component } from 'react'

class NoMatch extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'NoMatch')
			this.props.setPage('NoMatch');
	}

	render() {
		return (
			<div className='intern-page'>
				<p>NoMatch page (404)</p>
			</div>
		);
	}
}

export default NoMatch;
