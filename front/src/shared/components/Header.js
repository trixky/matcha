import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
	render() {
		return (
			<header>
				<div className='header-top'>
					<h1>matcha</h1>
				</div>
				<div className='header-bottom'>
					<nav>
						<h2>match me</h2>
						<h2>search</h2>
						<h2>visits</h2>
						<h2>pretenders</h2>
						<h2>chat</h2>
					</nav>
				</div>
			</header>
		)
	}
}

export default Header