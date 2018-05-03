import React from 'react'
import { shallow, mount } from 'enzyme'
import AddIcon from '@material-ui/icons/Add'
import ConnectedCreateStory, { CreateStory } from './CreateStory'
import { Provider } from 'react-redux'
import store from '../infrastructure/store'

it('renders create story button', () => {
  const wrapper = shallow(<CreateStory />)
  expect(wrapper.contains(<AddIcon />)).toBe(true)
})

it('opens modal when user clicks create new story', () => {
  const wrapper = mount(<CreateStory />)
  expect(wrapper.find('Dialog.create-story-form[open=true]').length).toEqual(0)
  wrapper.find('Button.create-story-button').simulate('click')
  expect(wrapper.find('Dialog.create-story-form[open=true]').length).toEqual(1)
})

it('closes modal when user clicks cancel', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  wrapper.find('Button.create-story-cancel-button').simulate('click')
  expect(wrapper.find('Dialog.create-story-form[open=true]').length).toEqual(0)
})

it('adds story to store when user clicks create', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedCreateStory />
    </Provider>
  )
  wrapper.find('Button.create-story-button').simulate('click')
  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  wrapper.find('input#title').simulate('change', {target: { value: 'Awesome Story!'}})
  wrapper.find('Input#filename').simulate('click')
  wrapper.find('input#filename').simulate('blur', {target: { id: 'filename', validity: { valid: true }}})
  wrapper.find('Button.create-story-create-button').simulate('click')
  const state = store.getState();
  expect(state.activeStory.title).toBe('Awesome Story!')
  expect(state.activeStory.filename).toBe('DUPA.txt')
})


