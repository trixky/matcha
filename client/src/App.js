// import modules
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import './App.css';


// import pages
import Account from './pages/account/Account'
import Authentification from './pages/authentification/Authentification'
import Chat from './pages/chat/Chat'
import ForgotPassword from './pages/forgot_password/ForgotPassword'
import ForgotPasswordSend from './pages/forgot_password_send/ForgotPasswordSend'
import ForgotUsername from './pages/forgot_username/ForgotUsername'
import ForgotUsernameSend from './pages/forgot_username_send/ForgotUsernameSend'
import Gallery from './pages/gallery/Gallery'
import Notification from './pages/notification/Notification'
import People from './pages/people/People'
import Profile from './pages/profile/Profile'
import Search from './pages/search/Search'
import Settings from './pages/settings/Settings'
import UpdateProfile from './pages/update_profile/UpdateProfile'
import Visits from './pages/visits/Visits'
import ResetPassword from './pages/reset_password/ResetPassword'

import NoMatch from './pages/noMatch/NoMatch'

// import components
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 'tyty',
			notification: false
		}
		this.readPage = this.readPage.bind(this);
		this.reasetPagedPage = this.setPage.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	readPage = () => {
		return (this.state.page)
	}

	setPage = page => {
		this.setState({ page })
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header readPage={this.readPage} notification={this.state.notification}/>
					<div className="page-container">
						<div className="page">
							<Switch>
								<Route exact path='/account'><Account readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/authentification'><Authentification readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/chat/:username'><Chat readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/forgotPassword'><ForgotPassword readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/forgotPasswordSend'><ForgotPasswordSend readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/forgotUsername'><ForgotUsername readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/forgotUsernameSend'><ForgotUsernameSend readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/profile/:username/gallery'><Gallery readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/'><Authentification readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/notification'><Notification readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/people'><People readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/profile/:username'><Profile readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/resetPassword'><ResetPassword readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/search'><Search readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/settings'><Settings readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/updateProfile'><UpdateProfile readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route exact path='/visits'><Visits readPage={this.readPage} setPage={this.setPage} /></Route>
								<Route path='*'><NoMatch readPage={this.readPage} setPage={this.setPage} /></Route>
							</Switch>
						</div>
						{/* {id != undefined ? <button onClick={() => socket.disconnect()}>disconnect</button> : null} */}
					</div>
					<Footer readPage={this.readPage} />
				</div>
			</Router>
		);
	}
}

export default App;
