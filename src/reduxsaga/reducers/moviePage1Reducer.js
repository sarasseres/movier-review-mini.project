import * as types from '../types';

const initialState = {
  moviesPage1: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_PAGE1_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_PAGE1_SUCCESS:
      return {
        ...state,
        loading: false,
        moviesPage1: action.moviesPage1
      }
    case types.GET_PAGE1_FAIL:
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