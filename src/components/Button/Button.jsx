import React from 'react';
import './Button.scss';

const Button = ({ label = 'Search' }) => {
	return (
		<button className={'button'} type='submit'>
			{label}
		</button>
	);
};

export default Button;
