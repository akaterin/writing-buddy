import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'

const sagaMiddleware = createSagaMiddleware()

const store = {
  ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
  runSaga: sagaMiddleware.run
}

export default store;
