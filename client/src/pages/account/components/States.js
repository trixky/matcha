import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './States.css'

class States extends Component {
	render() {
		return (
			<div className='states-containers'>
				<ul>
					<li className='state-line'>
						<p className='state-type'>reputation</p><p className='state-number'>6676</p>
					</li>
					<li className='state-line'>
						<p className='state-type state-link'><Link to='/'>matchs</Link></p><p className='state-number'>21</p>
					</li>
					<li className='state-line'>
						<p className='state-type state-link'><Link to='/'>likers</Link></p><p className='state-number'>42</p>
					</li>
					<li className='state-line'>
						<p className='state-type state-link'><Link to='/'>liked</Link></p><p className='state-number'>37</p>
					</li>
					<li className='state-line'>
						<p className='state-type state-link'><Link to='/'>viewers</Link></p><p className='state-number'>421</p>
					</li>
					<li className='state-line'>
						<p className='state-type state-link'><Link to='/'>blocked</Link></p><p className='state-number'>0</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default States;
