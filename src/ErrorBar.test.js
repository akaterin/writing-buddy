import React from 'react'
import { mount } from 'enzyme'
import ConnectedErrorBar, { ErrorBar } from './ErrorBar'
import store from './infrastructure/store'
import { Provider } from 'react-redux'
import { addError, resetStore } from './infrastructure/actions'

beforeEach( () => {
  store.dispatch(resetStore('Tests'))
})

it('it displays error message', () => {
  const wrapper = mount(<ErrorBar errors ={['It is unforgettable error']} />)
  expect(wrapper.find('.error-container').length).toBe(1)
  expect( wrapper.text() ).toBe('It is unforgettable error')
})

it('it is hidden when no errors', () => {
  const wrapper = mount(<ErrorBar errors={[]}/>)
  expect(wrapper.find('.error-container').length).toBe(0)
})


it('it receives errors from a store', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedErrorBar />
    </Provider>
  )
  store.dispatch(addError('A terrible error :('))
  wrapper.update()
  expect(wrapper.find('.error-container').length).toBe(1)
  expect( wrapper.text() ).toBe('A terrible error :(')
})
