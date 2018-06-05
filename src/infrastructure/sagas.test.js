import { scheduleDeleteError } from './sagas.js'
import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { deleteError } from './actions'

it('sheadules delete error when error added', () => {
  const saga = scheduleDeleteError({payload: 'Sth went wrong :('})
  expect(saga.next().value).toEqual(call(delay,20000))
  expect(saga.next().value)
    .toEqual(put(deleteError('Sth went wrong :(')))
  expect(saga.next())
    .toEqual({ done: true, value: undefined })
})
