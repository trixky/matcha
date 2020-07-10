import React, { Component } from 'react'

import './ProfileListInfo.css'

class ProfileListInfo extends Component {
	render() {
		const data = this.props.data;

		return (
			<div className='profile-info-list-container'>
				<ul>
					<li className='profil-state-line'>
						<p className='profil-state-type'>gender</p><p className='profil-state-number'>{data ? data.gender : 'loading...'}</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>orientation</p><p className='profil-state-number'>{data ? data.orientation : 'loading...'}</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>age</p><p className='profil-state-number'>{data ? data.age : 'loading...'}</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>distance</p><p className='profil-state-number'>{data ? data.distance + ' km': 'loading...'}</p>
					</li>
					<li className='profil-state-line'>
						<p className='profil-state-type'>reputation</p><p className='profil-state-number'>{data ? data.reputation + ' ⭐' : 'loading...'}</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default ProfileListInfo;
