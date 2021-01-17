import * as types from '../types';

export const getPage2 = (moviesPage2) => {
  return {
    type: types.GET_PAGE2_REQUESTED,
    payload: moviesPage2
  }
}