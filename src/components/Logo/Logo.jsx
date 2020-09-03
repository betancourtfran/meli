import React from 'react';
import Logo_ML from '../../assets/Logo_ML.png';
import './Logo.scss';

const Logo = () => {
	return (
		<div className='Logo__container'>
			<a href='/'>
				{' '}
				<img src={Logo_ML} alt='MeLi Logo' width='53' height='36' />
			</a>
		</div>
	);
};

export default Logo;
