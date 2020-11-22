import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
} from "../types";

// LOGIN
const loginUserAPI = (loginData) => {
  console.log("loginData", loginData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(("success result", result));
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log("fail", e);
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT
function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log("fail", e);
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

// USER_LOADING
const userLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/auth/user", config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// REGISTER_USER
const registerUserAPI = (registerData) => {
  return axios.post("api/user", registerData);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(("success result", result));
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log("fail", e);
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// clear Error
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
    console.error(e);
  }
}

function* watchclearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

// ENROLL
export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchuserLoading),
    fork(watchregisterUser),
    fork(watchclearError),
  ]);
}
