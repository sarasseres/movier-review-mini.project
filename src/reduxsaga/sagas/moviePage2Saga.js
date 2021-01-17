import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

const apiUrl = 'https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/home?page=2&limit=15';

async function getApiMovies() {
  const response = await axios.get(apiUrl);
  console.log(response.data, 'from saga page2');
  return response.data
}

function* fetchMovies(action) {
  try {
    const movies = yield call(getApiMovies);
    yield put({type: 'GET_PAGE2_SUCCESS', moviesPage2: movies});
  } catch(err) {
    console.log(err);
    yield put({type: 'GET_PAGE2_FAIL', message: err.message});
  }
}

function* movieSaga() {
  yield takeEvery('GET_PAGE2_REQUESTED', fetchMovies);
}

export default movieSaga;