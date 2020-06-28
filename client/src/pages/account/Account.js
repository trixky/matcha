import React, { Component } from 'react'
import './Account.css'

import States from './components/States'
import AccountOptions from './components/AccountOptions'

class Account extends Component {
	_isMounted = false;

	state = {
		data: null
	}

	componentDidMount() {
		this._isMounted = true;

		if (this.props.readPage() !== 'Account')
			this.props.setPage('Account');

		const requestOptions = {
			method: 'GET'
		};
		fetch('/account/myprofile', requestOptions)
			.then(response => response.json())
			.then(data => {
				if (this._isMounted) {
					this.setState({ data: data._data })
				}
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div className='intern-page account-container'>
				<h2 className='account-title'>my account</h2>
				<States data={this.state.data} />
				<AccountOptions data={this.state.data}/>
			</div>
		);
	}
}

export default Account;
