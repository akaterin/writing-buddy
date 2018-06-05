import {
  CREATE_STORY,
  DELETE_ERROR,
  ADD_ERROR,
  RESET_STORE,
} from "./actionsTypes"

const initialState = {
  activeStory: null,
  errors: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STORY:
      return { ...state, activeStory: action.payload }
    case ADD_ERROR:
      return { ...state, errors: state.errors.concat([action.payload]) }
    case DELETE_ERROR:
      const newErrors = state.errors.filter((err) => {
        return err !== action.payload
      })
      return { ...state, errors: newErrors }
    case RESET_STORE:
      return initialState
    default:
      return state;
  }
}
export default rootReducer;
