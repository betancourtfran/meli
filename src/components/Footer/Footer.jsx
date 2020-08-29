import React from 'react';
import './Footer.scss';

const Footer = () => {
	return (
		<div className={'Footer__container'}>
			<span>Made by Francisco</span>
			<a href='https://github.com/betancourtfran/poke-app' rel='noopener noreferrer' target='_blank'>
				Link to my github
			</a>
		</div>
	);
};

export default Footer;
