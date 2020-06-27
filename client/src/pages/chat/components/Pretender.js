import React from 'react'
import Avatar from '../../../shared/img/default/default-avatar-profil.png'

import './Pretender.css'

function Pretender() {
	return (
		<div className='pretender-chat-list'>
			<img className='pretender-chat-list-img' src={Avatar} alt='profile image' />
			<p className='pretender-chat-list-pseudo'>pseudo</p>
		</div>
	);
}

export default Pretender;
