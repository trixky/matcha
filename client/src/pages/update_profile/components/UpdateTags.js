import React, { Component } from 'react'

import './UpdateTags.css'

class UpdateTags extends Component {
	state = {
		language: 'on',
		movies: 'off',
		pets: 'off',
		nature: 'off',
		adventure: 'off',
		writing: 'off',
		fitness: 'off',
		astrology: 'on',
		shopping: 'off',
		technology: 'off',
		music: 'off',
		travel: 'on',
		photography: 'off',
		reading: 'off',
		sports: 'on',
		cooking: 'on',
		food: 'off',
		carrer: 'off',
		art: 'off',
		life: 'off',
		religion: 'off',
		history: 'on',
		school: 'off',
		science: 'off',
		family: 'off',
		sex: 'off',
		relationships: 'off',
		environement: 'on'
	}

	render() {
		console.log(this.state)
		return (
			<form>
				<p className='update-actual-tags-list'>
					{Object.keys(this.state).map((key, value) => <span className={'update-tag-span ' + this.state[key]} key={key}>{'#' + key}</span>)}
				</p>
			</form>
		);
	}
}

export default UpdateTags;
