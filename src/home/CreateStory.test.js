import React from 'react'
import { shallow, mount } from 'enzyme'
import AddIcon from '@material-ui/icons/Add'
import ConnectedCreateStory, { CreateStory } from './CreateStory'
import { Provider } from 'react-redux'
import store from '../infrastructure/store'
import { fs } from '../electronRemote'

jest.mock('../electronRemote', () => {
  return {
    dialog: {
      showSaveDialog: jest.fn( () => { return 'DUPA.txt' } )
    },
    fs: {
      writeFile: jest.fn(() => { return true })
    }
  }
})

beforeEach(() => {
  fs.writeFile.mockClear()
})

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

it('saves file on create', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedCreateStory />
    </Provider>
  )
  wrapper.find('CreateStory').instance()
    .handleCreateStory({title: 'Awesome Story', filename: 'dupa.txt'})

  expect(fs.writeFile).
    toHaveBeenCalledWith('dupa.txt', '{"title":"Awesome Story","filename":"dupa.txt"}',
    expect.anything())
})

it('handles an error', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedCreateStory />
    </Provider>
  )
  const createStoryInstance = wrapper.find('CreateStory').instance()

  fs.writeFile.mockImplementation( (filename, content, callback) => {
    const error = { message: 'Shitty content' }
    return callback(error)
  })

  expect( () => {
    createStoryInstance.handleCreateStory({
      title: 'Awesome Story',
      filename: 'dupa.txt'
    })
  }).toThrow()

})


