import React from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSubmit }) => {
	let placeholder = 'Nunca dejes de buscar';
	return (
		<div className='SearchBar__container'>
			<form action='/items' onSubmit={onSubmit}>
				<input className='SearchBar' type='text' name='search' placeholder={placeholder} />
				<button className='SearchBar__button__submit' type='submit'></button>
			</form>
		</div>
	);
};

export default SearchBar;
