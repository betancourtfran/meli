import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { SearchResults, Breadcrumbs, ProductDetails, Header, SearchBar } from './components';
import './App.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			isFetching: false,
		};
	}

	setFetchingState = (fetchingState) =>
		this.setState({
			isFetching: fetchingState,
		});

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
						<Route path='/item/:id' exact render={(props) => <ProductDetails {...props} setFetchingState={this.setFetchingState} isFetching={this.state.isFetching} />} />
						<Route
							path='/items'
							render={(props) => (
								<SearchResults
									{...props}
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
