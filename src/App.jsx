import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { SearchResults, Breadcrum, ProductDetails, Header, SearchBar } from './components';
import { fetchItems, fetchItemDetails } from './services/request';
import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			allItems: [],
			isFetching: false,
			itemNotFound: false,
			fetchedQuery: '',
		};
	}

	fetchItemsInfo = (items) => Promise.all(items.map(async (item) => await fetchItemDetails(item.name)));

	// handleItemsSearch = async query => {
	//   this.setState({
	//     isFetching: true
	//   });
	//   const itemsPromise = fetchItems(query);
	//   let foundItems;
	//   itemsPromise.then(items => {
	//     foundItems = items;
	//   });
	//   return foundItems;
	// }

	setSelectedItem = (selectedItem) => {
		console.log(selectedItem);
		this.setState({
			item: selectedItem,
		});
	};

	handleSubmit = async (event) => {
		// event.preventDefault();
		if (!event.target[0].value) return;
		const query = event.target[0].value;
		const results = await this.handleItemsSearch(query);
		if (results.length > 0) {
			this.setState({
				allItems: results,
				isFetching: false,
				query,
			});
		}
	};

	render = () => {
		return (
			<BrowserRouter>
				<div className='app'>
					<Route
						path='/'
						render={(props) => {
							return (
								<Header>
									<SearchBar />
									<Breadcrum {...props} />
								</Header>
							);
						}}
					/>
					<Switch>
						<Route path='/items/:id' exact render={(props) => <ProductDetails {...props} item={this.state.item} />} />
						<Route
							path='/items'
							render={(props) => (
								<SearchResults
									{...props}
									setSelectedItem={this.setSelectedItem}
									items={this.state.allItems}
									isFetching={this.state.isFetching}
									itemNotFound={this.state.itemNotFound}
								/>
							)}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	};
}

export default App;
