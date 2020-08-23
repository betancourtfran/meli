import React from 'react';
import { SearchResults, SearchBar, Footer, Header } from './components';
import { getItems, getItemDetails } from './services/request';
import './App.scss';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { items: [], allItems: [], isFetching: false, itemNotFound: false };
  }

  fetchItemsInfo = items => Promise.all(items.map(async item => await getItemDetails(item.name)));

  filterItem = async itemName => {
    let regex = new RegExp(`\\b(\\w*${itemName}\\w*)\\b`, 'i');
    let foundItems = this.state.allItems.filter(Item => regex.test(Item.name));
    if (foundItems.length === 0) {
      this.setState({
        isFetching: false,
        itemNotFound: true,
        items: foundItems
      });
      return;
    };
    let ItemsWithFullData = await this.fetchItemsInfo(foundItems);
    this.setState({
      items: ItemsWithFullData,
      isFetching: false
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (!event.target[0].value) return;
    this.setState({
      isFetching: true
    });
    this.filterItem(event.target[0].value);
  };

  componentDidMount = () => {
    let result = getItems();
    result.then(res => this.setState({
      allItems: res
    })
    );
  }

  render = () => {
    return (
      <div className='app'>
        <Header onSubmit={this.handleSubmit} />
        <SearchResults items={this.state.items} isFetching={this.state.isFetching} itemNotFound={this.state.itemNotFound} />
        <Footer />
      </div>
    )
  }

}

export default App;
