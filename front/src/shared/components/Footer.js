import React, { Component } from 'react'
import './Footer.css'

// import social network icone
import Facebook from '../img/social_icone/Circle Black White/Facebook_2.svg'
import Twitter from '../img/social_icone/Circle Black White/Twitter_2.svg'
import Pinterest from '../img/social_icone/Circle Black White/Pinterest_2.svg'
import Github from '../img/social_icone/Circle Black White/Github_2.svg'
import Instagram from '../img/social_icone/Circle Black White/Instagram_2.svg'

class Footer extends Component {
	handleDisconnect = () => {
		console.log('disconnecte clicked')
	}

	render() {
		return (
			<footer>
				<ul>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img' src={Facebook} alt='Facebook logo' />
						</a>
					</li>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img' src={Twitter} alt='Twitter logo' />
						</a>
					</li>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img' src={Pinterest} alt='Pinterest logo' />
						</a>
					</li>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img' src={Instagram} alt='Instagram logo' />
						</a>
					</li>
					<li>
						<a href='https://github.com/trixky/matcha' target='_blank' rel='noopener noreferrer'>
							<img className='footer-img' src={Github} alt='Github logo' />
						</a>
					</li>
					
				</ul>
				<button onClick={this.handleDisconnect} className='disconnect-btn'>disconnect</button>
			</footer>
		)
	}
}

export default Footer