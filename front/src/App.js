// import modules
import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import './App.css';

// import pages
import Account from './pages/account/Account'
import Authentification from './pages/authentification/Authentification'
import Chat from './pages/chat/Chat'
import Home from './pages/home/Home'
import My_profil from './pages/my_profil/My_profil'
import Pretenders from './pages/pretenders/Pretenders'
import Profil from './pages/profil/Profil'
import Search from './pages/search/Search'
import Visits from './pages/visits/Visits'

import No_match from './pages/no_match/No_match'

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
						<Route exact path='/Account'><Account /></Route>
						<Route exact path='/Authentification'><Authentification /></Route>
						<Route exact path='/Chat'><Chat /></Route>
						<Route exact path='/'><Home /></Route>
						<Route exact path='/My_profil'><My_profil /></Route>
						<Route exact path='/Pretenders'><Pretenders /></Route>
						<Route exact path='/Profil'><Profil /></Route>
						<Route exact path='/Search'><Search /></Route>
						<Route exact path='/Visits'><Visits /></Route>
						<Route path='*'><No_match /></Route>
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
