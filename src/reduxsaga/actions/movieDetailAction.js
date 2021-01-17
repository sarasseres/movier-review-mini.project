import * as types from '../types';

export const getMovieDetails = (text) => {
  return {
    type: types.SET_MOVIE_DETAIL,
    idMovie: text
  }
}