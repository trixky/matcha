import React, { Component } from 'react'

class Home extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Home')
			this.props.setPage('Home');
	}

	render() {
		return (
			<p>Home page</p>
		);
	}
}

export default Home;
