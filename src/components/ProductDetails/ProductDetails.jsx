import React from 'react';
import { currencyFormatter } from '../../utilities/numberFormatters';
import './ProductDetails.scss';

const ProductDetails = ({ item: product }) => {
	return (
		<div className='ProductDetails__container'>
			<div className='ProductDetails__product__image'>
				<img src={product?.picture} alt='Imagen del Producto' width='680' height='680' />
			</div>
			<aside className='ProductDetails__product__main-description'>
				<header>
					<span className='ProductDetails__product__main-description__subtitle'>
						{product?.item_condition} - {product?.sold_quantity} vendidos
					</span>
					<h1 className='ProductDetails__product__main-description__title'>{product?.title}</h1>
					<span className='ProductDetails__product__main-description__price'>{currencyFormatter(product?.price?.amount, product?.price?.currency)}</span>
					<button>Comprar</button>
				</header>
			</aside>
			<section className='ProductDetails__product__description'>
				<h2>Descripcion del producto</h2>
				<p>{product.item_description}</p>
			</section>
		</div>
	);
};

export default ProductDetails;
