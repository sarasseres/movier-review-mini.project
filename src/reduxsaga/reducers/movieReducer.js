import * as types from '../types';

const initialState = {
  movies: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_MOVIES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.movies
      }
    case types.GET_MOVIES_FAIL:
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