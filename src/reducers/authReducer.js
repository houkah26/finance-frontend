import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  UPDATE_USER,
  CLEAR_ERROR,
  AUTH_REQUEST
} from "../actions/types";

const INITIAL_STATE = {
  errorMessage: "",
  authenticated: false,
  user: {},
  isRequesting: false
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.user,
        errorMessage: "",
        authenticated: true,
        isRequesting: false
      };
    case UNAUTH_USER:
      return { ...INITIAL_STATE };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload, isRequesting: false };
    case UPDATE_USER:
      return { ...state, user: action.user, errorMessage: "" };
    case CLEAR_ERROR:
      return { ...state, errorMessage: "" };
    case AUTH_REQUEST:
      return { ...state, isRequesting: true };
    default:
      return state;
  }
};

export default auth;
