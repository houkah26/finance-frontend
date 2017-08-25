import cookie from "react-cookie";
import axios from "axios";
import { push } from "react-router-redux";

import errorHandler from "../handlers/errorHandler";
import loginHandler from "../handlers/loginHandler";

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, AUTH_REQUEST } from "../types";
import { API_URL } from "../../constants";

//= =====================
// Auth Action Creators
//= =====================
export const loginUser = ({ username, password }) => dispatch => {
  dispatch({
    type: AUTH_REQUEST
  });

  axios
    .post(`${API_URL}/auth/login`, { username, password })
    .then(response => {
      loginHandler(dispatch, response.data.token, response.data.user);
    })
    .catch(error => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
};

export const registerUser = ({
  username,
  firstName,
  lastName,
  password
}) => dispatch => {
  dispatch({
    type: AUTH_REQUEST
  });

  axios
    .post(`${API_URL}/auth/register`, {
      username,
      firstName,
      lastName,
      password
    })
    .then(response => {
      loginHandler(dispatch, response.data.token, response.data.user);
    })
    .catch(error => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: UNAUTH_USER });
  cookie.remove("token", { path: "/" });

  dispatch(push("/login"));
};

export const clearAuthErrors = () => {
  return function(dispatch) {
    dispatch({
      type: AUTH_ERROR,
      payload: ""
    });
  };
};

export const fetchUser = token => dispatch => {
  axios
    .get(`${API_URL}/user/info`, {
      headers: { Authorization: token }
    })
    .then(response => {
      // set auth status to true and set user info
      dispatch({
        type: AUTH_USER,
        user: response.data.user
      });
    })
    .catch(error => {
      // token was likely bad
      // remove token, return to login page, and dispatch error
      cookie.remove("token", { path: "/" });
      dispatch(push("/login"));

      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
};
