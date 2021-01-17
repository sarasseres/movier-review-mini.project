import * as types from '../types';

export const getPage3 = (moviesPage3) => {
  return {
    type: types.GET_PAGE3_REQUESTED,
    payload: moviesPage3
  }
}