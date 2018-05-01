import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from './infrastructure/store'

it('renders without crashing', () => {
  mount(
    <Provider store={store}>
      <App />
    </Provider>
  )
});
