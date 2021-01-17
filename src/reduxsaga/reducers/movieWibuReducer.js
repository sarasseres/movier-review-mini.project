import * as types from '../types';

const initialState = {
  moviesWibu: [],
  loading: false,
  error: null
}

const movies = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_MOVIES_WIBU_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.GET_MOVIES_WIBU_SUCCESS:
      return {
        ...state,
        loading: false,
        moviesWibu: action.moviesWibu
      }
    case types.GET_MOVIES_WIBU_FAIL:
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