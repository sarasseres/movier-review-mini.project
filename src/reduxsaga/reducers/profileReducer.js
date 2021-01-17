import * as types from '../types';

const initialState = {
  profile: {}
}

const profileDetails = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_PROFILE_DETAIL:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state
  }
}

export default profileDetails;