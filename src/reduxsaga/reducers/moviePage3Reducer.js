import * as types from '../types';

const initialState = {
  moviesPage3: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_PAGE3_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_PAGE3_SUCCESS:
      return {
        ...state,
        loading: false,
        moviesPage3: action.moviesPage3
      }
    case types.GET_PAGE3_FAIL:
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