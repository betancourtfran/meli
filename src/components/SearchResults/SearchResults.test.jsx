import React from 'react';
import { shallow } from 'enzyme';
import { ISearchResultsProps } from './SearchResults';
import { SearchResults } from '.';

describe('SearchResults Rendering Tests', () => {
	let props: ISearchResultsProps = {
		isFetching: false,
		pokemonNotFound: false,
		pokemons: [],
	};
	it('should contain div html element', () => {
		const wrapper = shallow(<SearchResults {...props} />).getElement();
		expect(wrapper.type).toBe('div');
	});
});
