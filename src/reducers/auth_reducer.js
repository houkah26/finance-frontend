import {
  AUTH_USER,
  UNAUTH_USER,
  ERROR,
  UPDATE_USER,
  CLEAR_ERROR,
  IS_REQUESTING
} from "../actions/types";

const INITIAL_STATE = {
  error: "",
  content: "",
  authenticated: false,
  user: {},
  isRequesting: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.user,
        error: "",
        authenticated: true,
        isRequesting: false
      };
    case UNAUTH_USER:
      return { ...INITIAL_STATE };
    case ERROR:
      return { ...state, error: action.payload, isRequesting: false };
    case UPDATE_USER:
      return { ...state, user: action.user, error: "" };
    case CLEAR_ERROR:
      return { ...state, error: "" };
    case IS_REQUESTING:
      return { ...state, isRequesting: true };
    default:
      return state;
  }
}
