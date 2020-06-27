import React, { Component } from 'react'

import './Tags.css'

class Tags extends Component {
	generate_tags_string(tags) {
		let string = '';

		tags.forEach(tag => {
			string += '#';
			string += tag;
			string += ' ';
		});
		return (string);
	}

	render() {
		const data = this.props.data;
		const tags = data ? this.generate_tags_string(data.tags) : '...';
		return (
			<div className='profil-tags-container'>
				<p>
					{tags}
				</p>
			</div>
		);
	}
}

export default Tags;
