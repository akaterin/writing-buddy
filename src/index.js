import React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux"
import store from "./infrastructure/store"
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import rootSaga from './infrastructure/sagas'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

store.runSaga(rootSaga)

registerServiceWorker();
