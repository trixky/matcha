import React, { Component } from 'react'
import './Footer.css'
import Facebook from '../img/social_icone/Circle Black White/Facebook_2.svg'
import Twitter from '../img/social_icone/Circle Black White/Twitter_2.svg'
import Pinterest from '../img/social_icone/Circle Black White/Pinterest_2.svg'

class Footer extends Component {
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
				</ul>
			</footer>
		)
	}
}

export default Footer