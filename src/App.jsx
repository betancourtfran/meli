import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { SearchResults, Breadcrumbs, ProductDetails, Header, SearchBar } from './components';
import { fetchItemDescription } from './services/request';
import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: [],
			items: [],
			categories: [],
			isFetching: false,
		};
	}

	fetchSelectedItem = async (item) => {
		const itemDescription = await fetchItemDescription(item.id);
		const selectedItem = { ...item, item_description: itemDescription };
		this.setSelectedItem(selectedItem);
		this.setFetchingState(false);
	};

	setFetchingState = (fetchingState) =>
		this.setState({
			isFetching: fetchingState,
		});

	setSelectedItem = (selectedItem) => {
		this.setState({
			selectedItem,
		});
	};

	setCategories = (categories) => {
		this.setState({
			categories,
		});
	};

	render = () => {
		return (
			<Router>
				<div className='app'>
					<Route
						path='/'
						render={(props) => {
							return (
								<>
									<Header>
										<SearchBar />
									</Header>
									<Breadcrumbs {...props} categories={this.state.categories} />
								</>
							);
						}}
					/>
					<Switch>
						<Route
							path='/item/:id'
							exact
							render={(props) => <ProductDetails {...props} item={this.state.selectedItem} setFetchingState={this.setFetchingState} isFetching={this.state.isFetching} />}
						/>
						<Route
							path='/items'
							render={(props) => (
								<SearchResults
									{...props}
									fetchSelectedItem={this.fetchSelectedItem}
									isFetching={this.state.isFetching}
									itemNotFound={this.state.itemNotFound}
									setFetchingState={this.setFetchingState}
									setCategories={this.setCategories}
								/>
							)}
						/>
					</Switch>
				</div>
			</Router>
		);
	};
}

export default App;
