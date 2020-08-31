import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { SearchResults, Breadcrumbs, ProductDetails, Header, SearchBar } from './components';
import { fetchItemDescription } from './services/request';
import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: {},
			items: [],
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

	render = () => {
		return (
			<Router>
				<div className='app'>
					<Route
						path='/'
						render={(props) => {
							return (
								<Header>
									<SearchBar />
									<Breadcrumbs {...props} />
								</Header>
							);
						}}
					/>
					<Switch>
						<Route path='/items/:id' exact render={(props) => <ProductDetails {...props} item={this.state.selectedItem} isFetching={this.state.isFetching} />} />
						<Route
							path='/items'
							render={(props) => (
								<SearchResults
									{...props}
									fetchSelectedItem={this.fetchSelectedItem}
									isFetching={this.state.isFetching}
									itemNotFound={this.state.itemNotFound}
									setFetchingState={this.setFetchingState}
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
