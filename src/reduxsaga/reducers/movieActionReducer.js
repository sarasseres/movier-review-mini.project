import * as types from '../types';

const initialState = {
  moviesAction: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_MOVIES_ACTION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_MOVIES_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        moviesAction: action.moviesAction
      }
    case types.GET_MOVIES_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.message
      }
    default:
      return state
  }
}

export default movies;