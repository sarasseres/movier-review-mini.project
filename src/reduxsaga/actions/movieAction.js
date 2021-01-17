import * as types from '../types';

export const getMovies = (movies) => {
  return {
    type: types.GET_MOVIES_REQUESTED,
    payload: movies
  }
}