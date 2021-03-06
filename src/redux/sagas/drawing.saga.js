import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getPending(action) {
  //send the get request to the server so it makes a database request
  let response = yield axios({
    method: 'GET',
    url: '/api/drawing/pending',
  });
  console.log(response.data);

  //take the info acquired from the database and set it as redux state
  yield put({
    type: 'SET_PENDING_DRAWINGS',
    payload: response.data,
  });
}
function* getApproved(action) {
  //send the get request to the server so it makes a database request
  let response = yield axios({
    method: 'GET',
    url: '/api/drawing/approved',
  });
  console.log(response.data);

  //take the info acquired from the database and set it as redux state
  yield put({
    type: 'SET_APPROVED_DRAWINGS',
    payload: response.data,
  });
}

function* fetchEventApproved(action) {
  //send the get request to the server so it makes a database request
  let response = yield axios({
    method: 'GET',
    url: action.url,
  });

  //take the info acquired from the database and set it as redux state
  yield put({
    type: 'SET_APPROVED_EVENT_DRAWINGS',
    payload: response.data,
  });
}

function* getDisapproved(action) {
  //send the get request to the server so it makes a database request
  let response = yield axios({
    method: 'GET',
    url: '/api/drawing/disapproved',
  });
  console.log(response.data);

  //take the info acquired from the database and set it as redux state
  yield put({
    type: 'SET_DISAPPROVED_DRAWINGS',
    payload: response.data,
  });
}
function* approveDrawing(action) {
  console.log('in drawing disapprove with action.payload of', action.payload);

  //send the get request to the server so it makes a database request
  let response = yield axios({
    method: 'PUT',
    url: `/api/drawing/approve/${action.payload}`,
  });
  console.log(response.data);
  //take the info acquired from the database and set it as redux state
  yield put({ type: 'GET_PENDING_DRAWINGS' });
  yield put({ type: 'GET_APPROVED_DRAWINGS' });
  yield put({ type: 'GET_DISAPPROVED_DRAWINGS' });
}
function* disapproveDrawing(action) {
  console.log('in drawing disapprove with action.payload of', action.payload);
  //send the get request to the server so it makes a database request
  let response = yield axios({
    method: 'PUT',
    url: `/api/drawing/disapprove/${action.payload}`,
  });
  console.log(response.data);

  //take the info acquired from the database and set it as redux state
  yield put({ type: 'GET_PENDING_DRAWINGS' });
  yield put({ type: 'GET_APPROVED_DRAWINGS' });
  yield put({ type: 'GET_DISAPPROVED_DRAWINGS' });
}

function* deleteDrawing(action) {
  console.log('in drawing delete with action.payload of', action.payload);
  //send the get request to the server so it makes a database request
  let response = yield axios({
    method: 'DELETE',
    url: `/api/drawing/${action.payload}`,
  });
  console.log(response.data);

  //take the info acquired from the database and set it as redux state
  yield put({ type: 'GET_PENDING_DRAWINGS' });
  yield put({ type: 'GET_APPROVED_DRAWINGS' });
  yield put({ type: 'GET_DISAPPROVED_DRAWINGS' });
}

function* postDrawing(action) {
  //   console.log('in drawing Post with action.payload of', action.payload);
  //send the get request to the server so it makes a database request
  let response = yield axios({
    method: 'POST',
    url: `/api/drawing/`,
    data: action.payload,
  });
  //   console.log(response.data);

  //take the info acquired from the database and set it as redux state
  // yield put({ type: 'GET_PENDING_DRAWINGS', });
  //Commented this out as I dont think we need this
}

function* drawingSaga() {
  yield takeLatest('GET_PENDING_DRAWINGS', getPending);
  yield takeLatest('GET_APPROVED_DRAWINGS', getApproved);
  yield takeLatest('FETCH_APPROVED_EVENT_DRAWINGS', fetchEventApproved);
  yield takeLatest('GET_DISAPPROVED_DRAWINGS', getDisapproved);
  yield takeLatest('APPROVE_DRAWING', approveDrawing);
  yield takeLatest('DISAPPROVE_DRAWING', disapproveDrawing);
  yield takeLatest('DELETE_DRAWING', deleteDrawing);
  yield takeLatest('POST_DRAWING', postDrawing);
}

export default drawingSaga;
