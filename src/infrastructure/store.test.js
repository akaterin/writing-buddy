import store from './store'
import { createStory, resetStore, addError, deleteError } from './actions'
import rootSaga from './sagas'
import { END } from 'redux-saga'

beforeEach(() => {
  store.dispatch(resetStore('Tests'))
  jest.useFakeTimers()
})

it('sets initial state', () => {
  expect(store.getState()).toEqual({ activeStory: null, errors: [] })
})

it('sets active story when story creted', () => {
  const newStory = {
    name: 'Lord of The Rings',
    fileName: 'lord_of_the_rings.json'
  }
  store.dispatch(createStory(newStory))
  expect(store.getState().activeStory).toEqual(newStory)
});

it('adds error when ADD_ERROR dispatched', () => {
  store.dispatch(addError('Some weird error'))
  expect(store.getState().errors).toEqual(expect.arrayContaining(['Some weird error']))
})

it('removes error when DELETE_ERROR dispatched', () => {
  store.dispatch(addError('Some weird error'))
  store.dispatch(deleteError('Some weird error'))
  expect(store.getState().errors).not.toEqual(expect.arrayContaining(['Some weird error']))
})

it('added error is removed after 20s', async () => {
  const sagaPromise = store.runSaga(rootSaga).done
  store.dispatch(addError('Some weird error'))
  store.dispatch(END)
  jest.runAllTimers();
  await sagaPromise
  expect(store.getState().errors.length).toEqual(0)
})
