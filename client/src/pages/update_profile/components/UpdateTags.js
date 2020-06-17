import React, { Component } from 'react'

import './UpdateTags.css'

class UpdateTags extends Component {
	render() {
		return (
			<form>
				<p className='update-actual-tags-list'><span className='update-tag-span'>#akm</span> <span className='update-tag-span'>#pistache</span> <span className='update-tag-span'>#doliprane</span> <span className='update-tag-span'>#mangue</span> <span className='update-tag-span'>#tir-fesse</span></p>
				<input className='form-input' type='text' placeholder='cinema' />
				<input className='form-input auth-submit' type='submit' value='add a tag' />
			</form>
		);
	}
}

export default UpdateTags;
