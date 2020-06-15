import React, { Component } from 'react'

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
						<p className='state-type'>viewer(s)</p><p className='state-number'>421</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>liker(s)</p><p className='state-number'>42</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>liked</p><p className='state-number'>37</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>match(s)</p><p className='state-number'>21</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>message(s)</p><p className='state-number'>67</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>blocker(s)</p><p className='state-number'>0</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>blocked</p><p className='state-number'>1</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default States;
