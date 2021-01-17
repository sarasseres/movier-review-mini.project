import * as types from '../types';

export const getThrillerMovies = (moviesThriller) => {
  return {
    type: types.GET_MOVIES_THRILLER_REQUESTED,
    payload: moviesThriller
  }
}