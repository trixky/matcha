import React, { Component } from 'react'

import './UpdateTags.css'

class UpdateTags extends Component {
	constructor(props) {
		super(props);

		this.tags_fetched = false;
		this.state = {
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
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}



	componentDidUpdate() {
		if (this.props.data && this.props.data.tags && !this.tags_fetched) {
			this.tags_fetched = true;
			const actives_tags = this.props.data.tags;
			let tags = this.state.tags
			actives_tags.forEach(tag => {
				tags[tag] = 'on'
			});
			this.setState({ tags })
		}
	}

	handleClick(e) {
		let tags = [];
		const state_tags = this.state.tags;
		const clicked_tag = e.currentTarget.textContent.substring(1);
		Object.keys(state_tags).map((key) => state_tags[key] === 'on' && tags.push(key))
		if (state_tags[clicked_tag] === 'off') {
			tags.push(clicked_tag)
		} else {
			tags = tags.filter((value) => value !== clicked_tag)
		}

		const body = {
			user: {
				tags
			}
		}

		const requestOptions = {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		};
		fetch('/account/myprofile', requestOptions)
			.then(response => response.json())
			.then(data => {
				const respons_tags = data._data.tags;
				let tags_copy = this.state.tags;
				Object.keys(tags_copy).map((key) => tags_copy[key] = 'off')
				respons_tags.forEach((value) => {
					tags_copy[value] = 'on'
				})
				this.setState({tags: tags_copy})
		});
	}

	render() {
		return (
			<form>
				<p className='update-actual-tags-list'>
					{Object.keys(this.state.tags).map((key) => <span className={'update-tag-span ' + this.state.tags[key]} onClick={this.handleClick} key={key}>{'#' + key}</span>)}
				</p>
			</form>
		);
	}
}

export default UpdateTags;
