import store from './store'
import { createStory } from './actions'

it('sets initial state', () => {
  expect(store.getState()).toEqual({ activeStory: null })
})

it('sets active story when story creted', () => {
  const newStory = {
    name: 'Lord of The Rings',
    fileName: 'lord_of_the_rings.json'
  }
  store.dispatch(createStory(newStory))
  expect(store.getState()).toEqual({ activeStory: newStory })
});
