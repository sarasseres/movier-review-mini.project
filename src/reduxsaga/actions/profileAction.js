import * as types from '../types';

export const getProfileDetails = (text) => {
  return {
    type: types.SET_PROFILE_DETAIL,
    profile: text
  }
}