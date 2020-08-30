import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { SearchResults, Breadcrum, ProductDetails, Header, SearchBar } from './components';
import { fetchItemDescription } from './services/request';
import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: {},
			items: [],
			allItems: [],
			isFetching: false,
			itemNotFound: false,
			fetchedQuery: '',
		};
	}

	fetchSelectedItem = async (item) => {
		const itemDescription = await fetchItemDescription(item.id);
		const selectedItem = { ...item, item_description: itemDescription };
		this.setSelectedItem(selectedItem);
	};

	setSelectedItem = (selectedItem) => {
		this.setState({
			selectedItem,
		});
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
						<Route path='/items/:id' exact render={(props) => <ProductDetails {...props} item={this.state.selectedItem} />} />
						<Route
							path='/items'
							render={(props) => (
								<SearchResults
									{...props}
									fetchSelectedItem={this.fetchSelectedItem}
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
