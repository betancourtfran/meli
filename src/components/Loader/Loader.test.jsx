import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from '.';

describe('Loader Rendering Tests', () => {
	let props = {
		isFetching: false,
	};
	it('should contain div html element', () => {
		const wrapper = shallow(<Loader {...props} />).getElement();
		expect(wrapper.type).toBe('div');
	});
});
