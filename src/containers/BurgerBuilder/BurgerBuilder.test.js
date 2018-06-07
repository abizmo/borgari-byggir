import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import { BuildControls } from '../../components/Burger';

configure({ adapter: new Adapter() });

describe('BurgerBuilder', () => {
  it('it should render BuildControls when receiving ingredients', () => {
    const wrapper = shallow(<BurgerBuilder initIngredientsHandler={ () => {}}/>);
    wrapper.setProps({ ingredients: { meat: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
