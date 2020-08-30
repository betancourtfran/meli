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
		this.state = { isFetching: false, itemNotFound: false, items: [] };
		this.placeholder = 'Nunca dejes de buscar';
	}

	fetchSelectedItem = (selectedItem) => {
		this.props.fetchSelectedItem(selectedItem);
	};

	handleItemsSearch = async (query) => {
		let items = await fetchItems(query);
		this.setState({ items });
	};

	getQuery = (query) => {
		let sanitizedQuery = query.split('=')[1];
		this.handleItemsSearch(sanitizedQuery);
	};

	componentDidMount = () => {
		this.getQuery(this.props.location.search);
	};

	render = () => {
		const { match } = this.props;
		return (
			<div className={'SearchResults__container'}>
				<Loader isFetching={this.state.isFetching} />
				{this.state.items.length > 0 ? (
					<>
						<div className={'SearchResults__results'}>
							<ul>
								{this.state.items.map((item) => (
									<NavLink onClick={() => this.fetchSelectedItem(item)} to={`${match.url}/${item.id}`}>
										<li>
											<section className='SearchResults__result'>
												<div className='SearchResults__result__image__container'>
													<img className='SearchResults__result__image' width='180' height='180' src={item.picture} alt={item.title} />
												</div>
												<div className='SearchResults__result__description'>
													<div className='SearchResults__result__price-state'>
														<div>
															<span className='SearchResults__result__price'>{currencyFormatter(item.price.amount, item.price.currency)} </span>
															{item.free_shipping && <img src={ic_shipping} alt='envio gratis' width='18' height='18' />}
														</div>
														<span className='SearchResults__result__state'>{item.state}</span>
													</div>
													<h2>{item.title}</h2>
													<span>Completo Unico</span>
												</div>
											</section>
										</li>
									</NavLink>
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
