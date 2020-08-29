import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '.';

describe('Footer Rendering Tests', () => {
	it('should contain div html element', () => {
		const wrapper = shallow(<Footer />).getElement();
		expect(wrapper.type).toBe('div');
	});
});
