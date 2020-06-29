import React, { Component } from 'react'

import './UpdateOrientation.css'

class UpdateOrientation extends Component {
	constructor(props) {
		super(props);

		this.tags_fetched = false;
		
		// this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	// componentDidUpdate() {
	// 	if (this.props.data && !this.tags_fetched) {
	// 		this.tags_fetched = true;
	// 		const actives_tags = this.props.data.tags;
	// 		let tags = this.state.tags
	// 		actives_tags.forEach(tag => {
	// 			tags[tag] = 'on'
	// 		});
	// 		this.setState({ tags })
	// 	}
	// }

	handleClick(e) {
		e.preventDefault();
		console.log('asdffff')
	}

	render() {
		const orientation = this.props.data && this.props.data.orientation ? this.props.data.orientation : 'asdf';
		return (
			<form>
				<select className='form-input' name="orientation" id="orientation" defaultValue={orientation}>
					<option value="heterosexual">heterosexual</option>
					<option value="homosexual">homosexual</option>
					<option value="bisexual">bisexual</option>
				</select>
				<input className='form-input auth-submit' type='submit' onClick={this.handleClick} value='update my orientation' />
			</form>
		);
	}
}

export default UpdateOrientation;
