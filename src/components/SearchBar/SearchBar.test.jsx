import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar } from '.';
import { Button } from '..';

describe('SearchBar Rendering Tests', () => {
	let props = {
		onSubmit: () => {},
	};
	it('should contain expected elements/components', () => {
		const wrapper = shallow(<SearchBar {...props} />);
		expect(wrapper.find(Button)).toHaveLength(1);
	});
});
