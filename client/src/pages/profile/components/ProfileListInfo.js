import React, { Component } from 'react'

import './ProfileListInfo.css'

class ProfileListInfo extends Component {
	render() {
		return (
			<div className='profile-info-list-container'>
				<ul>
					<li className='profil-state-line'>
						<p className='profil-state-type'>gender</p><p className='profil-state-number'>man</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>orientation</p><p className='profil-state-number'>hetero</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>age</p><p className='profil-state-number'>26</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>localisation</p><p className='profil-state-number'>paris</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>distance</p><p className='profil-state-number'>300 km</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>reputation</p><p className='profil-state-number'>6676</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>saw you</p><p className='profil-state-number'>yes</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default ProfileListInfo;
