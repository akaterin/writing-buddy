import React from 'react'
import Error from './Error'
import { mount } from 'enzyme'

it('dissplays the error message', () => {
  const wrapper = mount(
    <Error message='Something went wrong' />
  )
  expect(wrapper.text()).toBe('Something went wrong')
})

