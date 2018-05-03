import React from 'react'
import { shallow, mount } from 'enzyme'
import { dialog } from '../electronRemote'
import CreateStoryForm from './CreateStoryForm'

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


it('opens dialog when user clicks on filename', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  wrapper.find('Input#filename').simulate('click')
  expect(dialog.showSaveDialog).toHaveBeenCalled()
})

it('opens dialog on keyup', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  wrapper.find('Input#filename').simulate('keyUp')
  expect(dialog.showSaveDialog).toHaveBeenCalled()
})

it('sets the filename when dialog closed', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  const filenameInput = wrapper.find('Input#filename')
  filenameInput.simulate('keyUp')
  expect(wrapper.find('Input#filename').props().value).toBe('dupa.txt')
})

// TODO remember to set validations correctly on first render
it('displays no errors on first render', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  const titleInput = wrapper.find('TextField#title')
  expect(titleInput.props().error).toBe(false)
  const filenameInput = wrapper.find('TextField#filename')
  expect(filenameInput.props().error).toBe(false)
})

it('disables create button when form invalid', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  expect( wrapper.find('Button.create-story-create-button').props().disabled ).toBe(true)

  wrapper.find('input#title').simulate('change', {target: { value: 'Awesome Story!'}})
  expect( wrapper.find('Button.create-story-create-button').props().disabled ).toBe(true)


  wrapper.find('input#title').simulate('change', {target: { value: ''}})
  wrapper.find('input#filename').simulate('change', {target: { value: 'dupa.txt'}})
  expect( wrapper.find('Button.create-story-create-button').props().disabled ).toBe(true)
})

it('enables create button when form valid', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  wrapper.find('input#filename').simulate('blur', {target: { id: 'filename', validity: { valid: true }}})
  expect( wrapper.find('Button.create-story-create-button').props().disabled ).toBe(false)
})

//JSDOM does not support validity :(
it('validates title on blur', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  let titleInput = wrapper.find('input#title')

  //Current version of jsdom does not support validity :(
  titleInput.simulate('blur', {target: { id: 'title', validity: { valid: false }}})
  titleInput = wrapper.find('TextField#title')
  expect(titleInput.props().error).toBe(true)
})

it('validates filename on blur', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  let filenameInput = wrapper.find('input#filename')

  //Current version of jsdom does not support validity :(
  filenameInput.simulate('blur', {target: { id: 'filename', validity: { valid: false }}})
  filenameInput = wrapper.find('TextField#filename')
  expect(filenameInput.props().error).toBe(true)
})

it('calls onCreate callback when create button clicked', () => {
  const onCreateStub = jest.fn()
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { onCreateStub }
      onCancel = { jest.fn() }
    />
  )

  wrapper.find('form.create-story-form').instance().checkValidity = () => { return true}
  wrapper.find('input#filename').simulate('blur', {target: { id: 'filename', validity: { valid: true }}})
  wrapper.find('Button.create-story-create-button').simulate('click')
  expect(onCreateStub).toHaveBeenCalled()
})

it('calls onCancel callback when create button clicked', () => {
  const onCloseStub = jest.fn()
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { onCloseStub }
    />
  )

  wrapper.find('Button.create-story-cancel-button').simulate('click')
  expect(onCloseStub).toHaveBeenCalled()
})
