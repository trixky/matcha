import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './States.css'

class States extends Component {
	render() {
		return (
			<div className='states-containers'>
				<ul>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>reputation</Link></p><p className='state-number'>6676</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>match(s)</Link></p><p className='state-number'>21</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>liker(s)</Link></p><p className='state-number'>42</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>liked</Link></p><p className='state-number'>37</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>viewer(s)</Link></p><p className='state-number'>421</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>message(s)</Link></p><p className='state-number'>67</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>blocker(s)</Link></p><p className='state-number'>0</p>
					</li>
					<li className='state-line'>
						<p className='state-type'><Link to='/'>blocked</Link></p><p className='state-number'>1</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default States;
