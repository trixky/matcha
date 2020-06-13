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
import Home from './pages/home/Home'
import Notification from './pages/notification/Notification'
import Pretenders from './pages/pretenders/Pretenders'
import Profil from './pages/profil/Profil'
import Search from './pages/search/Search'
import Visits from './pages/visits/Visits'

import NoMatch from './pages/noMatch/NoMatch'

// import components
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'

class App extends Component {
	state = {
		page: 'tyty'
	}

	readPage = () => {
		return (this.state.page)
	}

	setPage = page => {
		this.setState({page})
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header readPage={this.readPage} />
					<div className="page-container">
						<div className="page">
							<Switch>
								<Route exact path='/account'><Account readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route exact path='/authentification'><Authentification readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route exact path='/chat'><Chat readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route exact path='/'><Home readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route exact path='/notification'><Notification readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route exact path='/pretenders'><Pretenders readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route exact path='/profil'><Profil readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route exact path='/search'><Search readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route exact path='/visits'><Visits readPage={this.readPage} setPage={this.setPage}/></Route>
								<Route path='*'><NoMatch readPage={this.readPage} setPage={this.setPage}/></Route>
							</Switch>
						</div>
					</div>
					<Footer readPage={this.readPage} />
				</div>
			</Router>
		);
	}
}

export default App;
