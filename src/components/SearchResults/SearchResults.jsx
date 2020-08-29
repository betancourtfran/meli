import React from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import { currencyFormatter } from '../../utilities/numberFormatters';
import { fetchItems, fetchItemDetails } from '../../services/request';
import { Loader, ProductDetails } from '../';
import './SearchResults.scss';

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isFetching: false, itemNotFound: false, items: [] };
		this.placeholder = 'Nunca dejes de buscar';
	}

	setSelectedItem = (selectedItem) => {
		this.props.setSelectedItem(selectedItem);
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
									<li>
										<NavLink onClick={() => this.setSelectedItem(item)} to={`${match.url}/${item.id}`}>
											<div className={'SearchResults____result'}>
												<img width='150' height='150' src={item.thumbnail} alt={item.title} />
												<section>
													<h1>{item.title}</h1>
													<ul>
														<li>Precio {currencyFormatter(item.original_price || item.price, item.currency_id || item.installment.currency_id)}</li>
														<li>{item.seller_address.state.name}</li>
														<li>Completo Unico</li>
													</ul>
												</section>
											</div>
										</NavLink>
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
