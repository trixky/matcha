import React, { Component } from 'react'
import './Account.css'

import States from './components/States'
import AccountOptions from './components/AccountOptions'

class Account extends Component {
	componentDidMount() {

		if (this.props.readPage() !== 'Account')
			this.props.setPage('Account');

		const requestOptions = {
			method: 'GET'
		};
		fetch('/account', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log('attention data ! :')
				console.log(data)
			});
	}

	render() {
		return (
			<div className='intern-page account-container'>
				<h2 className='account-title'>my account</h2>
				<States />
				<AccountOptions />
			</div>
		);
	}
}

export default Account;
