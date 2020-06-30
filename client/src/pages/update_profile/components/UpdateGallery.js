import React, { Component } from 'react'
import './UpdateGallery.css'

class UpdateGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFileProfile: null
		}
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
		this.fileUploadProfileHandler = this.fileUploadProfileHandler.bind(this);
	}

	fileSelectedHandler = event => {
		const new_file_selected = event.target.files[0];
		this.setState({ selectedFileProfile: new_file_selected })
		console.log('onon change')
	}

	fileUploadProfileHandler = event => {
		event.preventDefault()
		console.log('on veut envoyer')
		console.log(this.state.selectedFileProfile);

		let formData = new FormData();
		formData.append('image', this.state.selectedFileProfile);

		fetch('picture/profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				'Accept': 'application/json'
			},
			body: formData
		})
			// .then(response => response.json())
			// .then(data => {
			// 	console.log(data)
			// });
	}

	render() {
		return (
			<div className='update-gallery-container'>
				<img className='update-gallery-img-profile' src={'https://images.theconversation.com/files/312307/original/file-20200128-81416-1bjupq6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'} alt='profile' />
				<form>
					<input type='file' className='form-input file-input' onChange={this.fileSelectedHandler} accept=".jpg,.png,.jpeg,.svg" />
					<input className='form-input auth-submit' onClick={this.fileUploadProfileHandler} type='submit' value='update my profile picture' />
					<input className='form-input auth-submit' type='submit' value='delete my profile picture' />
				</form>
				<img className='update-gallery-img' src={'https://www.croquetteland.com/wp/wp-content/uploads/2015/07/chat-qui-part-en-vacances.jpg'} alt='profile' />
				<form>
					<input type='file' className='form-input file-input' onChange={this.fileSelectedHandler} accept=".jpg,.png,.jpeg,.svg" />
					<input className='form-input auth-submit' type='submit' value='update my seconde picture' />
					<input className='form-input auth-submit' type='submit' value='delete my seconde picture' />
				</form>
				<form>
					<input type='file' className='form-input file-input' onChange={this.fileSelectedHandler} accept=".jpg,.png,.jpeg,.svg" />
					<input className='form-input auth-submit' type='submit' value='add a third picture' />
				</form>
			</div>
		);
	}
}

export default UpdateGallery;
