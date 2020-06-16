import React, { Component } from 'react'
import './Gallery.css'

import Left_row from '../../shared/img/interface_icone/previous.svg'
import Right_row from '../../shared/img/interface_icone/next.svg'

class Gallery extends Component {
	componentDidMount() {
		if (this.props.readPage() !== 'Gallery')
			this.props.setPage('Gallery');
	}

	handleNext() {
		console.log('next image ->')
	}

	handlePrevious() {
		console.log('previous image <-')
	}

	render() {
		return (
			<div className='intern-page'>
				<h2>gallery</h2>
				<h3>1/4</h3>
				<div className='gallery-img-container' onClick={this.handleNext}>
					<img className='gallery-img' src={'https://img.ohmymag.com/article/480/buzz/un-chat-bizarre-en-train-de-manger_31a53d5882ee4cb707c5dfaf5cf14895d0860a34.jpg'} alt='link to account page' />
				</div>
				<div className='gallery-row'>
					<img className='header-img scale-hover' onClick={this.handlePrevious} src={Left_row} alt='link to account page' />
					<img className='header-img scale-hover' onClick={this.handleNext} src={Right_row} alt='link to account page' />
				</div>
			</div>
		);
	}
}

export default Gallery;
