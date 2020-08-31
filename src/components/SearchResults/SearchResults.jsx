import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { currencyFormatter } from '../../utilities/numberFormatters';
import { fetchItems } from '../../services/request';
import { Loader } from '../';
import ic_shipping from '../../assets/ic_shipping.png';
import './SearchResults.scss';

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], itemNotFound: false };
		this.placeholder = 'Nunca dejes de buscar';
	}

	fetchSelectedItem = (selectedItem) => {
		this.props.setFetchingState(true);
		this.props.fetchSelectedItem(selectedItem);
	};

	handleItemsSearch = async (query) => {
		let items = await fetchItems(query);
		this.props.setFetchingState(false);
		this.setState({ items: !items ? [] : items, itemNotFound: !items ? true : false });
	};

	getQuery = (query) => {
		let sanitizedQuery = query.split('=')[1];
		this.handleItemsSearch(sanitizedQuery);
	};

	componentDidMount = () => {
		this.getQuery(this.props.location.search);
		this.props.setFetchingState(true);
	};

	render = () => {
		const { match } = this.props;
		return (
			<div className={'SearchResults__container'}>
				<Loader isFetching={this.props.isFetching} />
				{this.state.items.length > 0 ? (
					<>
						<div className={'SearchResults__results'}>
							<ul>
								{this.state.items.map((item) => (
									<li>
										<section className='SearchResults__result'>
											<div className='SearchResults__result__image__container'>
												<img className='SearchResults__result__image' width='180' height='180' src={item.picture} alt={item.title} />
											</div>
											<div className='SearchResults__result__description'>
												<div className='SearchResults__result__price-state'>
													<div>
														<span className='SearchResults__result__price'>{currencyFormatter(item.price.amount, item.price.currency)} </span>
														{item.free_shipping && <img className='free-shipping-logo' src={ic_shipping} title='envio gratis' width='18' height='18' />}
													</div>
													<span className='SearchResults__result__state'>{item.state}</span>
												</div>
												<NavLink onClick={() => this.fetchSelectedItem(item)} to={`${match.url}/${item.id}`}>
													<h2>{item.title}</h2>
													<span>Completo Unico</span>
												</NavLink>
											</div>
										</section>
									</li>
								))}
							</ul>
						</div>
					</>
				) : (
					this.state.itemNotFound && <h2>Item not found</h2>
				)}
			</div>
		);
	};
}

export default withRouter(SearchResults);
