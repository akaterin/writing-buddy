import React from 'react'
import { shallow, mount } from 'enzyme'
import AddIcon from '@material-ui/icons/Add'
import { dialog } from '../electronRemote'
import ConnectedCreateStory, { CreateStory } from './CreateStory'
import { Provider } from 'react-redux'
import store from '../infrastructure/store'

jest.mock('../electronRemote', () => {
  return {
    dialog: {
      showSaveDialog: jest.fn( () => { return 'dupa.txt' } )
    }
  }
})

beforeEach(() => {
  dialog.showSaveDialog.mockClear();
});


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

it('opens dialog when user clicks on filename', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  wrapper.find('Input#filename').simulate('click')
  expect(dialog.showSaveDialog).toHaveBeenCalled()
})

it('opens dialog on keyup', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  wrapper.find('Input#filename').simulate('keyUp')
  expect(dialog.showSaveDialog).toHaveBeenCalled()
})

it('sets the filename when dialog closed', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  const filenameInput = wrapper.find('Input#filename')
  filenameInput.simulate('keyUp')
  expect(wrapper.find('Input#filename').props().value).toBe('dupa.txt')
})

it('adds story to store when user clicks create', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedCreateStory />
    </Provider>
  )
  wrapper.find('Button.create-story-button').simulate('click')
  wrapper.find('input#title').simulate('change', {target: { value: 'Awesome Story!'}})
  wrapper.find('Input#filename').simulate('click')
  wrapper.find('Button.create-story-create-button').simulate('click')
  const state = store.getState();
  expect(state.activeStory.title).toBe('Awesome Story!')
  expect(state.activeStory.filename).toBe('dupa.txt')
})


