import React from 'react';
import { Logo } from '../';
import './Header.scss';

const Header = ({ children }) => {
	return (
		<div className='Header__wrapper'>
			<div className='Header__container'>
				<Logo />
				{children}
			</div>
		</div>
	);
};

export default Header;
