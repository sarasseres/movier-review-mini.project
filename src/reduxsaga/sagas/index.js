import {all} from 'redux-saga/effects';
import movieSaga from './movieSaga';
import moviePage1Saga from './moviePage1Saga';
import moviePage2Saga from './moviePage2Saga';
import moviePage3Saga from './moviePage3Saga';
import movieActionSaga from './movieActionSaga';
import movieThrillerSaga from './movieThrillerSaga';
import movieComedySaga from './movieComedySaga';
import movieRomanceSaga from './movieRomanceSaga';
import movieWibuSaga from './movieWibuSaga';

export default function* rootSaga() {
  yield all([
    movieSaga(), moviePage1Saga(), moviePage2Saga(), moviePage3Saga(), movieActionSaga(), movieThrillerSaga(), movieComedySaga(), movieRomanceSaga(), movieWibuSaga()
  ])
}