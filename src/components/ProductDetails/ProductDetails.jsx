import React from 'react';
import { Loader } from '../';
import { currencyFormatter } from '../../utilities/numberFormatters';
import { fetchItemDetails, fetchItemDescription } from '../../services/request';
import './ProductDetails.scss';

class ProductDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = { item: [] };
	}

	handleItemSearch = async (query) => {
		let item = await fetchItemDetails(query);
		let itemDescription = await fetchItemDescription(item.id);
		let mergedItem = { item_description: itemDescription, ...item };
		this.props.setFetchingState(false);
		this.setState({ item: !mergedItem ? [] : mergedItem });
	};

	getItemId = (pathname) => {
		let splittedQuery = pathname.split('/');
		this.handleItemSearch(splittedQuery[splittedQuery.length - 1]);
	};

	componentDidMount = async () => {
		this.getItemId(this.props.location.pathname);
		this.props.setFetchingState(true);
	};

	render = () => {
		return (
			<div className='ProductDetails__container'>
				<Loader isFetching={this.props.isFetching} />
				<div className='ProductDetails__product__image'>
					<img src={this.state.item?.picture} alt='Imagen del Producto' width='680' height='680' />
				</div>
				<aside className='ProductDetails__product__main-description'>
					<header>
						<span className='ProductDetails__product__main-description__subtitle'>
							{this.state.item?.item_condition} - {this.state.item?.sold_quantity} vendidos
						</span>
						<h1 className='ProductDetails__product__main-description__title'>{this.state.item?.title}</h1>
						<span className='ProductDetails__product__main-description__price'>{currencyFormatter(this.state.item?.price?.amount, this.state.item?.price?.currency)}</span>
						<button>Comprar</button>
					</header>
				</aside>
				<section className='ProductDetails__product__description'>
					<h2>Descripcion del producto</h2>
					<p>{this.state.item?.item_description}</p>
				</section>
			</div>
		);
	};
}

export default ProductDetails;
