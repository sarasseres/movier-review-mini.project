import * as types from '../types';

export const getRomanceMovies = (moviesRomance) => {
  return {
    type: types.GET_MOVIES_ROMANCE_REQUESTED,
    payload: moviesRomance
  }
}