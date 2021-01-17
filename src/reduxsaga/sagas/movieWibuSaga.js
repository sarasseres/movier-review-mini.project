import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

const apiUrl = 'https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/home/genre/anime'

async function getApiMovies() {
    const response = await axios.get(apiUrl);
    console.log(response.data, 'from saga wibu');
    return response.data
}

function* fetchMovies(action) {
  try {
    const movies = yield call(getApiMovies);
    yield put({type: 'GET_MOVIES_WIBU_SUCCESS', moviesWibu: movies});
  } catch(err) {
    console.log(err);
    yield put({type: 'GET_MOVIES_WIBU_FAIL', message: err.message});
  }
}

function* movieSaga() {
  yield takeEvery('GET_MOVIES_WIBU_REQUESTED', fetchMovies);
}

export default movieSaga;