import {combineReducers} from 'redux';

// import reducer
import movieReducer from './movieReducer';
import moviePage1Reducer from './moviePage1Reducer';
import moviePage2Reducer from './moviePage2Reducer';
import moviePage3Reducer from './moviePage3Reducer';
import movieDetailReducer from './movieDetailReducer';
import movieActionReducer from './movieActionReducer';
import movieThrillerReducer from './movieThrillerReducer';
import movieComedyReducer from './movieComedyReducer';
import movieRomanceReducer from './movieRomanceReducer';
import movieWibuReducer from './movieWibuReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  movieList: movieReducer,
  moviePage1List: moviePage1Reducer,
  moviePage2List: moviePage2Reducer,
  moviePage3List: moviePage3Reducer,
  movieDetail: movieDetailReducer,
  movieActionList: movieActionReducer,
  movieThrillerList: movieThrillerReducer,
  movieComedyList: movieComedyReducer,
  movieRomanceList: movieRomanceReducer,
  movieWibuList: movieWibuReducer,
  userProfile: profileReducer,
});

export default rootReducer;