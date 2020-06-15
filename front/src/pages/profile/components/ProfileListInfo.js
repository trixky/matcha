import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './ProfileListInfo.css'

class ProfileListInfo extends Component {
	render() {
		return (
			<div className='profile-info-list-container'>
				<ul>
				<li className='state-line'>
						<p className='state-type'><Link to='/'>genre</Link></p><p className='state-number'>man</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>orientation</Link></p><p className='state-number'>hetero</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>age</Link></p><p className='state-number'>26</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>localisation</Link></p><p className='state-number'>paris</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>tags</Link></p><p className='state-number'>6</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>reputation</Link></p><p className='state-number'>6676</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>saw you</Link></p><p className='state-number'>yes</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default ProfileListInfo;
