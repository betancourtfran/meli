import React from 'react';
import './Breadcrumbs.scss';

const Breadcrumbs = ({ categories }) => {
	const getCategories = (categories) => categories?.map((category) => category.name).join(' > ');

	return <div className='Breadcrum__container'>{getCategories(categories)}</div>;
};

export default Breadcrumbs;
