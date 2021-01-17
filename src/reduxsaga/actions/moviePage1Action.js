import * as types from '../types';

export const getPage1 = (moviesPage1) => {
  return {
    type: types.GET_PAGE1_REQUESTED,
    payload: moviesPage1
  }
}