import * as types from '../types';

const initialState = {
  moviesThriller: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_MOVIES_THRILLER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_MOVIES_THRILLER_SUCCESS:
      return {
        ...state,
        loading: false,
        moviesThriller: action.moviesThriller
      }
    case types.GET_MOVIES_THRILLER_FAIL:
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