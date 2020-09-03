import React from 'react';
import meli_not_found from '../../assets/meli_not_found.png';
import './NotFound.scss';

const NotFound = () => {
	return (
		<div className='NotFound__container'>
			<img src={meli_not_found} alt='Not Results' />
			<h1>Oops, no encontramos lo que buscas</h1>
			<ul>
				<li>Revisá la ortografía de la palabra.</li>
				<li>Utilizá palabras más genéricas o menos palabras.</li>
				<li>Navegá por las categorías para encontrar un producto similar</li>
			</ul>
		</div>
	);
};

export default NotFound;
