import React from 'react';
import './Breadcrumbs.scss';

const Breadcrumbs = ({ categories, location: { search = '' } }) => {
	const query = search.split('=')[1];
	const sanitizedQ = query?.includes('+') ? query.split('+').join(' ') : query;
	const getCategories = (categories) => categories?.map((category) => category.name).join(' > ');
	const joinedCategories = getCategories(categories);

	return <div className='Breadcrum__container'>{`${sanitizedQ && joinedCategories ? joinedCategories + ' > ' + sanitizedQ?.charAt(0).toUpperCase() + sanitizedQ?.slice(1) : ''}`}</div>;
};

export default Breadcrumbs;
