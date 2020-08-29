import React from 'react';
import { currencyFormatter } from '../../utilities/numberFormatters';
import './ProductDetails.scss';

const ProductDetails = ({ item: product }) => {
	return (
		<div className='ProductDetails__container'>
			<div className='ProductDetails__product__image'>
				<img src={product?.thumbnail} alt='Imagen del Producto' width='680' height='680' />
			</div>
			<aside className='ProductDetails__product__main-description'>
				<header>
					<span className='ProductDetails__product__main-description__subtitle'>
						{product?.attributes[1]?.value_name} - {product?.sold_quantity} vendidos
					</span>
					<h1 className='ProductDetails__product__main-description__title'>{product?.title}</h1>
					<span className='ProductDetails__product__main-description__price'>
						{currencyFormatter(product?.original_price || product?.price, product?.currency_id || product?.installment.currency_id)}
					</span>
					<button>Comprar</button>
				</header>
			</aside>
			<section className='ProductDetails__product__description'>
				<h2>Descripcion del producto</h2>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti distinctio atque fugit quibusdam error id repudiandae debitis accusantium alias? Labore aspernatur, in laudantium
					beatae incidunt et exercitationem, quaerat dicta tempora deleniti necessitatibus laborum similique ratione dolorum quasi excepturi modi esse voluptate atque recusandae eveniet
					ducimus quae! Maxime dolores impedit facilis!
				</p>
			</section>
		</div>
	);
};

export default ProductDetails;
