import * as types from '../types';

export const getWibuMovies = (moviesWibu) => {
  return {
    type: types.GET_MOVIES_WIBU_REQUESTED,
    payload: moviesWibu
  }
}