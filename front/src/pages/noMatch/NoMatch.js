import React, { Component } from 'react'

class NoMatch extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'NoMatch')
			this.props.setPage('NoMatch');
	}

	render() {
		return (
			<p>NoMatch page (404)</p>
		);
	}
}

export default NoMatch;
