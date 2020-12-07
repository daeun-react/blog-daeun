import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  COMMENT_LOADING_FAILURE,
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
} from "../types";

const loadCommentsAPI = (payload) => {
  return axios.get(`/api/post/${payload}/comments`);
};

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

const uploadCommentsAPI = (payload) => {
  console.log(`/api/post/${payload.id}/comments`);
  return axios.post(`/api/post/${payload.id}/comments`, payload);
};

function* uploadComments(action) {
  console.log("aa");
  try {
    const result = yield call(uploadCommentsAPI, action.payload);
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchUploadComments() {
  console.log("aad");
  yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComments);
}

export default function* commentSaga() {
  yield all([fork(watchLoadComments), fork(watchUploadComments)]);
}
