import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, {shallow}  from 'enzyme'
import App from './App'
import {ValueInput} from './tests/t'


Enzyme.configure({adapter: new Adapter()})

it("will render 3 value input component", () =>{
  const wrapper = shallow(<App />)
  const v_inputs = wrapper.find(ValueInput).length
  expect(v_inputs).toBe(3)

})
