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
		this.onDeleteFile = this.onDeleteFile.bind(this);
	}

	onFileChange = event => {
		this.setState({ selectedFileProfile: event.target.files[0] });
	};

	onFileUpload = (e) => {
		e.preventDefault()
		if (this.state.selectedFileProfile != null) {
			const _this = this;
			const formData = new FormData();
			const url = (this.props.nbr === 0 ? 'picture/profile' : 'picture/' + this.props.nbr);

			console.log(url)

			formData.append(
				"image",
				this.state.selectedFileProfile,
				this.state.selectedFileProfile.name
			);

			axios.post(url, formData)
				.then(() => {
					_this.props.refresh_profile()
				})
		}
	};

	onDeleteFile = (e) => {
		e.preventDefault()
		const _this = this;
		const url = this.props.nbr === 0 ? 'picture/profile' : 'picture/' + this.props.nbr;

		axios.put(url)
			.then(() => {
				_this.props.refresh_profile()
			})
	}

	render() {
		const nbr = this.props.nbr;
		const picture_name =
			nbr === 0 ? 'profile' :
				nbr === 1 ? 'first' :
					nbr === 2 ? 'second' :
						nbr === 3 ? 'thrid' :
							nbr === 4 ? 'fourth' : null;

		if (!this.props.add) {
			return (
				<div className='update-gallery-sub-container'>
					<img className='update-gallery-img' src={this.props.img_url + '?hash=' + Date.now()} alt='profile' />
					<form onSubmit={this['onFileUpload']}>
						<input type='file' className='form-input file-input' onChange={this.onFileChange} accept=".jpg,.png,.jpeg,.svg" />
						<input className='form-input auth-submit' type='submit' value={`update my ${picture_name} picture`} />
						<input className='form-input auth-submit' onClick={this.onDeleteFile} type='submit' value={`delete my ${picture_name} picture`} />
					</form>
				</div>
			)
		} else if (nbr <= 4 && nbr !== -1) {
			return (
				<div className='update-gallery-sub-container'>
					<form onSubmit={this['onFileUpload']}>
						<input type='file' className='form-input file-input' onChange={this.onFileChange} accept=".jpg,.png,.jpeg,.svg" />
						<input className='form-input auth-submit' type='submit' value={`add my ${picture_name} picture`} />
					</form>
				</div>
			)
		} else {
			return (
				null
			)
		}
	}
}

class UpdateGallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFileProfile: null
		}
		this.default_profile_img = 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'

		this.picture_nbr = this.picture_nbr.bind(this);
	}

	picture_nbr() {
		if (this.props.data) {
			for (let i = 1; i < 5; i++) {
				if (this.props.data['picture' + i] === '') {
					return (i);
				}
			}
		}
		return (-1)
	}

	render() {
		return (
			<div className='update-gallery-container'>
				{this.props.data && this.props.data.profile ? <UpdatePicture refresh_profile={this.props.refresh_profile} img_url={this.props.data ? this.props.data.profile : this.state.default_profile_img} add={false} nbr={0} /> : null}
				{this.props.data && this.props.data.picture1 ? <UpdatePicture refresh_profile={this.props.refresh_profile} img_url={this.props.data.picture1} add={false} nbr={1} /> : null}
				{this.props.data && this.props.data.picture2 ? <UpdatePicture refresh_profile={this.props.refresh_profile} img_url={this.props.data.picture2} add={false} nbr={2} /> : null}
				{this.props.data && this.props.data.picture3 ? <UpdatePicture refresh_profile={this.props.refresh_profile} img_url={this.props.data.picture3} add={false} nbr={3} /> : null}
				{this.props.data && this.props.data.picture4 ? <UpdatePicture refresh_profile={this.props.refresh_profile} img_url={this.props.data.picture4} add={false} nbr={4} /> : null}
				{this.props.data ? <UpdatePicture refresh_profile={this.props.refresh_profile} img_url={this.props.data.picture4} add={true} nbr={this.picture_nbr()} /> : null}
			</div>
		);
	}
}

export default UpdateGallery;
