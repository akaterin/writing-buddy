import React from 'react'
import { shallow, mount } from 'enzyme'
import { dialog } from '../electronRemote'
import CreateStoryForm from './CreateStoryForm'

var global = global;
let validMock = jest.fn()
let validForm = jest.fn()

const defineValidity = {
  get() {
    return {
      valid: validMock()
    }
  },
  configurable: true
};


global.HTMLFormElement.prototype.checkValidity = validForm;
Object.defineProperty(global.HTMLInputElement.prototype, 'validity', defineValidity);

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
  expect(dialog.showSaveDialog).toHaveBeenCalledWith({ defaultPath: '.json'})

  wrapper.find('input#title').simulate('change', { target: { value: 'AwesomeStory' } })
  wrapper.find('Input#filename').simulate('click')
  expect(dialog.showSaveDialog).toHaveBeenCalledWith({ defaultPath: 'AwesomeStory.json'})
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
  const onCreateStub = jest.fn()
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { onCreateStub }
      onCancel = { jest.fn() }
    />
  )
  validForm.mockReturnValue(false)

  wrapper.find('Button.create-story-create-button').simulate('click')
  expect(onCreateStub).toHaveBeenCalledTimes(0)
})

it('enables create button when form valid and calls onCreate', () => {
  const onCreateStub = jest.fn()
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { onCreateStub }
      onCancel = { jest.fn() }
    />
  )
  validForm.mockReturnValue(true)
  wrapper.find('Button.create-story-create-button').simulate('click')
  expect(onCreateStub).toHaveBeenCalledTimes(1)
})

//JSDOM does not support validity :(
it('validates title on blur', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  let titleInput = wrapper.find('input#title')
  validMock.mockReturnValueOnce(false)

  titleInput.simulate('blur', {target: titleInput.instance()})
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
  validForm.mockReturnValue(true)
  let filenameInput = wrapper.find('input#filename')
  validMock.mockReturnValueOnce(false)

  //Current version of jsdom does not support validity :(
  filenameInput.simulate('blur', filenameInput.instance())
  filenameInput = wrapper.find('TextField#filename')
  expect(filenameInput.props().error).toBe(true)
})

it('displays error when user clicks create', () => {
  const wrapper = mount(
    <CreateStoryForm
      onCreate = { jest.fn() }
      onCancel = { jest.fn() }
    />
  )
  validMock.mockReturnValue(false)
  validForm.mockReturnValue(false)
  wrapper.find('Button.create-story-create-button').simulate('click')
  wrapper.update()
  let filenameInput = wrapper.find('TextField#filename')
  expect(filenameInput.props().error).toBe(true)
  let titleInput = wrapper.find('TextField#title')
  expect(titleInput.props().error).toBe(true)
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
