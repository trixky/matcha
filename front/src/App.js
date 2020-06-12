// import modules
import React from 'react';
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
import MyProfil from './pages/myProfil/MyProfil'
import Pretenders from './pages/pretenders/Pretenders'
import Profil from './pages/profil/Profil'
import Search from './pages/search/Search'
import Visits from './pages/visits/Visits'

import NoMatch from './pages/noMatch/NoMatch'

// import components
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<div className="page">
					<Switch>
						<Route exact path='/account'><Account /></Route>
						<Route exact path='/authentification'><Authentification /></Route>
						<Route exact path='/chat'><Chat /></Route>
						<Route exact path='/'><Home /></Route>
						<Route exact path='/myProfil'><MyProfil /></Route>
						<Route exact path='/pretenders'><Pretenders /></Route>
						<Route exact path='/profil'><Profil /></Route>
						<Route exact path='/search'><Search /></Route>
						<Route exact path='/visits'><Visits /></Route>
						<Route path='*'><NoMatch /></Route>
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
