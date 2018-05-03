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
  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  wrapper.find('input#title').simulate('change', {target: { value: 'Awesome Story!'}})
  wrapper.find('Input#filename').simulate('click')
  wrapper.find('input#filename').simulate('blur', {target: { id: 'filename', validity: { valid: true }}})
  wrapper.find('Button.create-story-create-button').simulate('click')
  const state = store.getState();
  expect(state.activeStory.title).toBe('Awesome Story!')
  expect(state.activeStory.filename).toBe('dupa.txt')
})

it('displays no errors on open', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  const titleInput = wrapper.find('TextField#title')
  expect(titleInput.props().error).toBe(false)
  const filenameInput = wrapper.find('TextField#filename')
  expect(filenameInput.props().error).toBe(false)
})

it('disables create button when form invalid', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  expect( wrapper.find('Button.create-story-create-button').props().disabled ).toBe(true)

  wrapper.find('input#title').simulate('change', {target: { value: 'Awesome Story!'}})
  expect( wrapper.find('Button.create-story-create-button').props().disabled ).toBe(true)


  wrapper.find('input#title').simulate('change', {target: { value: ''}})
  wrapper.find('input#filename').simulate('change', {target: { value: 'dupa.txt'}})
  expect( wrapper.find('Button.create-story-create-button').props().disabled ).toBe(true)
})

it('enables create button when form valid', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  wrapper.find('input#filename').simulate('blur', {target: { id: 'filename', validity: { valid: true }}})
  expect( wrapper.find('Button.create-story-create-button').props().disabled ).toBe(false)
})

//JSDOM does not support validity :(
it('validates title on blur', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  let titleInput = wrapper.find('input#title')

  //Current version of jsdom does not support validity :(
  titleInput.simulate('blur', {target: { id: 'title', validity: { valid: false }}})
  titleInput = wrapper.find('TextField#title')
  expect(titleInput.props().error).toBe(true)
})

it('validates filename on blur', () => {
  const wrapper = mount(<CreateStory />)
  wrapper.find('Button.create-story-button').simulate('click')
  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  let filenameInput = wrapper.find('input#filename')

  //Current version of jsdom does not support validity :(
  filenameInput.simulate('blur', {target: { id: 'filename', validity: { valid: false }}})
  filenameInput = wrapper.find('TextField#filename')
  expect(filenameInput.props().error).toBe(true)
})


