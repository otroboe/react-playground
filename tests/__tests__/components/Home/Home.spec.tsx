import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Home } from 'app/components';

describe('Home page', () => {
  test('Renders correctly', () => {
    const tree = renderer
      .create(<Home />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Welcome message', () => {
    const home = shallow(<Home />);
  
    expect(home.text()).toEqual('Welcome You !');
  });
});
