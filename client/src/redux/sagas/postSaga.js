import axios from "axios";
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLeading,
} from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
} from "../types";

//load post
const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

//upload post
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  console.log("uploadPostAPI payload", payload);
  return axios.post(`/api/post`, payload, config);
};

function* uploadPost(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);
    console.log("uploadPost result", result);
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchUploadPost() {
  yield takeLeading(POST_UPLOADING_REQUEST, uploadPost);
}

//loadPostDetail post
const loadPostDetailAPI = (payload) => {
  console.log("loadPostDetailAPi", payload);
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetailPost(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log("loadPostDetailPost success", result);
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
    console.log(result.data);
  } catch (e) {
    console.error("loadPostDetailPost error", e);
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchloadPostDetailPost() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetailPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPost),
    fork(watchloadPostDetailPost),
  ]);
}
