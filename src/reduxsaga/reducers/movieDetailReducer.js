import * as types from '../types';

const initialState = {
  idMovie: null
}

const movieDetails = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_MOVIE_DETAIL:
      return {
        ...state,
        idMovie: action.idMovie
      }
    default:
      return state
  }
}

export default movieDetails;