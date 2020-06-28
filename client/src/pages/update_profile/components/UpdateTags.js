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
				relationships: 'on',
				environement: 'on'
			}
		}
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.handleClick = this.handleClick.bind(this);
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

	handleClick(e) {
		let tags = [];
		const state_tags = this.state.tags;

		Object.keys(state_tags).map((key) => {
			if (state_tags[key] === 'on') {
				tags.push(key)
			}
		})
		tags.push(e.currentTarget.textContent.substring(1))

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
				console.log(data)
				this.setState({ data: data._data })
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
