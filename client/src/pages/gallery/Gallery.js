import React, { Component } from 'react'
import './Gallery.css'

import Left_row from '../../shared/img/interface_icone/previous.svg'
import Right_row from '../../shared/img/interface_icone/next.svg'

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			selected: 1
		}

		this.componentDidMount = this.componentDidMount.bind(this);
		this.selected_to_url = this.selected_to_url.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.picture_nbr = this.picture_nbr.bind(this);
	}

	componentDidMount() {
		if (this.props.readPage() !== 'Gallery')
			this.props.setPage('Gallery');

		const current_user = window.location.pathname.split('/')[2];

		const requestOptions = {
			method: 'GET',
			// body
		};
		fetch('/account/' + current_user, requestOptions)
			.then(response => response.json())
			.then(data => {
				this.setState({ data: data._data })
			});
	}

	selected_to_url(selected) {
		if (--selected === 0)
			return ('profile');
		return ('picture' + selected);
	}

	handleNext() {
		const current_selected  = this.state.selected;
		
		if (current_selected < this.picture_nbr()) {
			this.setState({selected: current_selected + 1})
		}
	}

	handlePrevious() {
		const current_selected  = this.state.selected;
		
		if (current_selected > 1) {
			this.setState({selected: current_selected - 1})
		}
	}

	picture_nbr() {
		if (this.state.data) {
			for (let i = 1; i < 5; i++) {
				if (this.state.data['picture' + i] === '') {
					return (i);
				}
			}
		}
		return (-1)
	}

	render() {
		// const default_url_img = 'https://img.ohmymag.com/article/480/buzz/un-chat-bizarre-en-train-de-manger_31a53d5882ee4cb707c5dfaf5cf14895d0860a34.jpg';
		const url_img = this.state.data ? this.state.data[this.selected_to_url(this.state.selected)] : false
		return (
			<div className='intern-page'>
				<h2>gallery</h2>
				<h3>{this.state.selected}/{this.picture_nbr() !== -1 ? this.picture_nbr() : 'loading...'}</h3>
				<div className='gallery-img-container' onClick={this.handleNext}>
					{url_img ? <img className='gallery-img' src={url_img} alt='link to account page' /> : 'loading'}
				</div>
				<div className='gallery-row'>
					<img className='header-img scale-hover' onClick={this.handlePrevious} src={Left_row} alt='link to account page'/>
					<img className='header-img scale-hover' onClick={this.handleNext} src={Right_row} alt='link to account page' />
				</div>
			</div>
		);
	}
}

export default Gallery;
