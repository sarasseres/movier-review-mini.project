import * as types from '../types';

export const getComedyMovies = (moviesComedy) => {
  return {
    type: types.GET_MOVIES_COMEDY_REQUESTED,
    payload: moviesComedy
  }
}