import { delay } from 'redux-saga'
import { takeEvery, put, call } from 'redux-saga/effects'
import { deleteError } from './actions'
import { ADD_ERROR } from './actionsTypes'

export function* scheduleDeleteError(action){
  yield call(delay, 20000)
  yield put(deleteError(action.payload))
}

function* watchAddError(){
  yield takeEvery(ADD_ERROR, scheduleDeleteError)
}


export default watchAddError

