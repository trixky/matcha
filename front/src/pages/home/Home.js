import React, { Component } from 'react'

class Home extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Home')
			this.props.setPage('Home');
	}

	render() {
		return (
			<div className='intern-page'>
				<p>Home page</p>
			</div>
		);
	}
}

export default Home;
