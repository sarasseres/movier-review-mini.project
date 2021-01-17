import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

const apiUrl = 'https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/home?page=3&limit=15';

async function getApiMovies() {
  const response = await axios.get(apiUrl);
  console.log(response.data, 'from saga page3');
  return response.data
}

function* fetchMovies(action) {
  try {
    const movies = yield call(getApiMovies);
    yield put({type: 'GET_PAGE3_SUCCESS', moviesPage3: movies});
  } catch(err) {
    console.log(err);
    yield put({type: 'GET_PAGE3_FAIL', message: err.message});
  }
}

function* movieSaga() {
  yield takeEvery('GET_PAGE3_REQUESTED', fetchMovies);
}

export default movieSaga;