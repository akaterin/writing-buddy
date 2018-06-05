import {
  CREATE_STORY,
  DELETE_ERROR,
  ADD_ERROR,
  RESET_STORE,
} from "./actionsTypes"

export const createStory = story => ({ type: CREATE_STORY, payload: story })
export const deleteError = error => ({ type: DELETE_ERROR, payload: error })
export const addError = error => ({ type: ADD_ERROR, payload: error })
export const resetStore = reason => ({ type: RESET_STORE, payload: reason })

