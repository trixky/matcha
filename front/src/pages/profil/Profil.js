import React, { Component } from 'react'

class Profil extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Profil')
			this.props.setPage('Profil');
	}

	render() {
		return (
			<p>Profil page</p>
		);
	}
}

export default Profil;
