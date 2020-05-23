import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
// import ExampleJest from '../../../src/components/Examples/Jest'
import ExampleJest from '@/components/Examples/Jest'

describe('example jest & enzyme with ts', () => {
  it('simple component test', () => {
    const props = {
      content: 'jest',
    }
    const wrapper = shallow(<ExampleJest {...props} />)
    expect(wrapper.find('div').text()).equal(props.content)
  })
})
