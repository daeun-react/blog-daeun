const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
} = require("../types");

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  isLoading: false,
  user: "",
  userId: "",
  userName: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: "",
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: "",
      };
    case LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        isAuth: false,
        isLoading: false,
        userId: null,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };

    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
        errorMsg: "",
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: "",
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: "",
      };
    default:
      return state;
  }
};

export default authReducer;
