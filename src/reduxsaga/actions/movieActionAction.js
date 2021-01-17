import * as types from '../types';

export const getActionMovies = (moviesAction) => {
  return {
    type: types.GET_MOVIES_ACTION_REQUESTED,
    payload: moviesAction
  }
}