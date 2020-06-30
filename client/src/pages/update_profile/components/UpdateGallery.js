import React, { Component } from 'react'
import './UpdateGallery.css'
import axios from 'axios'

const img_updater = (nbr, img_url) => {
	return (
		<div className='update-gallery-sub-container'>
			<img className='update-gallery-img' src={img_url} alt='profile' />
			<form>
				<input type='file' className='form-input file-input' accept=".jpg,.png,.jpeg,.svg" />
				<input className='form-input auth-submit' type='submit' value='update my seconde picture' />
				<input className='form-input auth-submit' type='submit' value='delete my seconde picture' />
			</form>
		</div>
	)
}

class UpdateGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFileProfile: null
		}
		this.default_profile_img = 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'

		this.onFileChange = this.onFileChange.bind(this);
		this.onFileUpload = this.onFileUpload.bind(this);
	}


	// On file select (from the pop up) 
	onFileChange = event => {

		// Update the state 
		this.setState({ selectedFileProfile: event.target.files[0] });

		console.log('on a changer')

	};

	// On file upload (click the upload button) 
	onFileUpload = (e) => {
		e.preventDefault()
		if (this.state.selectedFileProfile != null) {
			const formData = new FormData();

			formData.append(
				"image",
				this.state.selectedFileProfile,
				this.state.selectedFileProfile.name
			);

			axios.post("picture/profile", formData)
				.then((response) => {
					console.log(response.data)
				})
		}
	};

	render() {
		console.log(this.props.data)
		return (
			<div className='update-gallery-container'>
				<div className='update-gallery-sub-container'>
					<img className='update-gallery-img-profile' src={this.props.data ? this.props.data.profile : this.default_profile_img} alt='profile' />
					<form onSubmit={this['onFileUpload']} action="picture/profile" method="POST" encType="multipart/form-data">
						<input className='form-input auth-submit' type="file" onChange={this.onFileChange} name="image" />
						<input className='form-input auth-submit' type="submit" value="update my profile" />
					</form>
				</div>
				{this.props.data && !this.props.data['picture1'] ? img_updater(1, this.props.data['picture1']) : null}
			</div>
		);
	}
}

export default UpdateGallery;
