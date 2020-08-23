import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '.';

describe('Button Rendering Tests', () => {
    it('should contain button html element', ()=> {
        const wrapper = shallow(<Button />).getElement();
        expect(wrapper.type).toBe('button');
    });
});