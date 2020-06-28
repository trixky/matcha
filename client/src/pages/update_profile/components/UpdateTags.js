import React, { Component } from 'react'

import './UpdateTags.css'

class UpdateTags extends Component {
	tags_fetched = false;

	state = {
		tags: {
			language: 'off',
			movies: 'off',
			pets: 'off',
			nature: 'off',
			adventure: 'off',
			writing: 'off',
			fitness: 'off',
			astrology: 'off',
			shopping: 'off',
			technology: 'off',
			music: 'off',
			travel: 'off',
			photography: 'off',
			reading: 'off',
			sports: 'off',
			cooking: 'off',
			food: 'off',
			carrer: 'off',
			art: 'off',
			life: 'off',
			religion: 'off',
			history: 'off',
			school: 'off',
			science: 'off',
			family: 'off',
			sex: 'off',
			relationships: 'off',
			environement: 'off'
		}
	}

	componentDidUpdate() {
		if (this.props.data && !this.tags_fetched) {
			this.tags_fetched = true;
			const actives_tags = this.props.data.tags;
			let tags = this.state.tags
			actives_tags.forEach(tag => {
				tags[tag] = 'on'
			});
			this.setState({ tags })
		}
	}

	render() {
		return (
			<form>
				<p className='update-actual-tags-list'>
					{Object.keys(this.state.tags).map((key, value) => <span className={'update-tag-span ' + this.state.tags[key]} key={key}>{'#' + key}</span>)}
				</p>
			</form>
		);
	}
}

export default UpdateTags;
