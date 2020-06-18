import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './ForgotUsername.css'

class ForgotUsername extends Component {
    state = {
        input: ""
    }

    componentDidMount() {
		if (this.props.readPage() !== 'ForgotUsername')
			this.props.setPage('ForgotUsername');
    }

    onChange(e){
        this.setState({
            input: e.target.value})
    }

	handleSubmit(event) {
		event.preventDefault();
        const xhr = new XMLHttpRequest();
		xhr.open('post', '/forget/username', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {if(xhr.responseText) {alert(xhr.responseText)}}
        xhr.send( JSON.stringify({email: this.state.input}));
		this.props.history.push('/forgotUsernameSend');
	}

	render() {
		return (
			<div className='intern-page forgot-username-container'>
				<h2 className='forgot-username-title'>forgot username</h2>
				<p>Please enter your account email so we can send you your username.</p>
				<form onSubmit={this.handleSubmit.bind(this)} className='forgot-username-form'>
					<input className='form-input' type='email' placeholder='email' value={this.state.input} onChange={(e) => this.onChange(e)} required />
					<input className='form-input auth-submit' type='submit' value='send' />
				</form>
			</div>
		);
	}
}

export default withRouter(ForgotUsername);
