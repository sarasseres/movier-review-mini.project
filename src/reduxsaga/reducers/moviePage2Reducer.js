import * as types from '../types';

const initialState = {
  moviesPage2: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_PAGE2_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_PAGE2_SUCCESS:
      return {
        ...state,
        loading: false,
        moviesPage2: action.moviesPage2
      }
    case types.GET_PAGE2_FAIL:
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