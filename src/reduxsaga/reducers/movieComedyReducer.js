import * as types from '../types';

const initialState = {
  moviesComedy: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_MOVIES_COMEDY_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_MOVIES_COMEDY_SUCCESS:
      return {
        ...state,
        loading: false,
        moviesComedy: action.moviesComedy
      }
    case types.GET_MOVIES_COMEDY_FAIL:
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