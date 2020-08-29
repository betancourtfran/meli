import React from 'react';
import './Loader.scss';

const Loader = ({ isFetching }) => {
	return <div className={isFetching ? 'showLoader' : 'hideLoader'}></div>;
};
export default Loader;
