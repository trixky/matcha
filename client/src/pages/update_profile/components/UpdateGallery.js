import React, { Component } from 'react'
import './UpdateGallery.css'
import axios from 'axios'

class UpdatePicture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFileProfile: null
		}
		this.default_profile_img = 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'

		this.onFileChange = this.onFileChange.bind(this);
		this.onFileUpload = this.onFileUpload.bind(this);
	}

	onFileChange = event => {
		this.setState({ selectedFileProfile: event.target.files[0] });
	};

	onFileUpload = (e) => {
		e.preventDefault()
		if (this.state.selectedFileProfile != null) {
			const formData = new FormData();
			const url = this.props.nbr === 0 ? 'picture/profile' : 'picture/' + this.props.nbr;

			console.log(url)

			formData.append(
				"image",
				this.state.selectedFileProfile,
				this.state.selectedFileProfile.name
			);

			axios.post(url, formData)
				.then((response) => {
					console.log(response.data)
				})
		}
	};

	render() {
		return (
			<div className='update-gallery-sub-container'>
				<img className='update-gallery-img' src={this.props.img_url} alt='profile' />
				<form onSubmit={this['onFileUpload']}>
					<input type='file' className='form-input file-input' onChange={this.onFileChange} accept=".jpg,.png,.jpeg,.svg" />
					<input className='form-input auth-submit' type='submit' value='update my seconde picture' />
					<input className='form-input auth-submit' type='submit' value='delete my seconde picture' />
				</form>
			</div>
		)
	}
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
		this.picture_nbr = this.picture_nbr.bind(this);
	}


	onFileChange = event => {
		this.setState({ selectedFileProfile: event.target.files[0] });
	};

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

	picture_nbr() {
		if (this.props.data) {
			for (let i = 1; i < 5; i++) {
				if (this.props.data['picture' + i] !== '') {
					return (i);
				}
			}
		}
		return (-1)
	}

	render() {
		console.log(this.props.data)
		return (
			<div className='update-gallery-container'>
				<div className='update-gallery-sub-container'>
					<img className='update-gallery-img-profile' src={this.props.data && this.props.data.profile !== '' ? this.props.data.profile : this.default_profile_img} alt='profile' />
					<form onSubmit={this['onFileUpload']} action="picture/profile" method="POST" encType="multipart/form-data">
						<input className='form-input auth-submit' type="file" onChange={this.onFileChange} name="image" />
						<input className='form-input auth-submit' type="submit" value="update my profile" />
					</form>
				</div>
				{this.props.data && this.props.data.picture1 ? <UpdatePicture img_url={this.props.data.picture1} nbr={1}/> : null }
				{this.props.data && this.props.data.picture2 ? <UpdatePicture img_url={this.props.data.picture1} nbr={2}/> : null }
				{this.props.data && this.props.data.picture3 ? <UpdatePicture img_url={this.props.data.picture1} nbr={3}/> : null }
				{this.props.data && this.props.data.picture4 ? <UpdatePicture img_url={this.props.data.picture1} nbr={4}/> : null }
			</div>
		);
	}
}

export default UpdateGallery;
