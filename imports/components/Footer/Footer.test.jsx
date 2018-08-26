import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer.jsx';

describe('Footer', () => {
  it('should render', () => {
    const item = shallow(<Footer />);

    expect(item).to.equal(item);
  });
});
