import { CREATE_STORY } from "./actionsTypes"

const initialState = {
  activeStory: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STORY:
      return { ...state, activeStory: action.payload }
    default:
      return state;
  }
}
export default rootReducer;
