import React, { Component } from 'react'


import './States.css'

class States extends Component {
	_isMounted = false;

	state = {
		loading_message: 'loading...',
		point_nbr: 0
	}

	componentDidMount() {
		this._isMounted = true;
		this.refresh_point_nbr();
	}
	
	refresh_point_nbr() {
		const _this = this;
		
		setTimeout(() => {
			if (_this._isMounted === true && !_this.props.data) {
				const point_nbr = _this.state.point_nbr;
				const new_point_nbr = (point_nbr === 3 ? 1 : point_nbr + 1);
				_this.setState({ point_nbr: new_point_nbr, loading_message: 'loading' + '.'.repeat(new_point_nbr)})
				_this.refresh_point_nbr();
			}
		}, 600);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const data = this.props.data;

		return (
			<div className='states-containers'>
				<ul>
					<li className='state-line'>
						<p className='state-type'>reputation</p><p className='state-number'>{data ? data.reputation : this.state.loading_message}</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>matchs</p><p className='state-number'>{data ? data.match : this.state.loading_message}</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>likers</p><p className='state-number'>{data ? data.likers : this.state.loading_message}</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>liked</p><p className='state-number'>{data ? data.liked : this.state.loading_message}</p>
					</li>
					<li className='state-line'>
						<p className='state-type'>viewers</p><p className='state-number'>{data ? data.viewers : this.state.loading_message}</p>
					</li>
				</ul>
			</div>
		);
	}
}

export default States;
