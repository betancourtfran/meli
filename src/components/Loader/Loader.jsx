import React from 'react';
import Logo_ML from '../../assets/Logo_ML.png';
import './Loader.scss';

const Loader = ({ isFetching }) => {
	return (
		<div className={isFetching ? 'showLoader' : 'hideLoader'}>
			<img src={Logo_ML} alt='' />
		</div>
	);
};
export default Loader;
