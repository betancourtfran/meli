import React from 'react';
import { Loader } from '../';
import { currencyFormatter } from '../../utilities/numberFormatters';
import './ProductDetails.scss';

const ProductDetails = ({ item, isFetching }) => {
	return (
		<div className='ProductDetails__container'>
			<Loader isFetching={isFetching} />
			<div className='ProductDetails__product__image'>
				<img src={item?.picture} alt='Imagen del Producto' width='680' height='680' />
			</div>
			<aside className='ProductDetails__product__main-description'>
				<header>
					<span className='ProductDetails__product__main-description__subtitle'>
						{item?.item_condition} - {item?.sold_quantity} vendidos
					</span>
					<h1 className='ProductDetails__product__main-description__title'>{item?.title}</h1>
					<span className='ProductDetails__product__main-description__price'>{currencyFormatter(item?.price?.amount, item?.price?.currency)}</span>
					<button>Comprar</button>
				</header>
			</aside>
			<section className='ProductDetails__product__description'>
				<h2>Descripcion del producto</h2>
				<p>{item.item_description}</p>
			</section>
		</div>
	);
};

export default ProductDetails;
