import * as types from '../types';

const initialState = {
  moviesRomance: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_MOVIES_ROMANCE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_MOVIES_ROMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        moviesRomance: action.moviesRomance
      }
    case types.GET_MOVIES_ROMANCE_FAIL:
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