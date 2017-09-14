import axios from "axios";
import cookie from "react-cookie";
import { push } from "react-router-redux";

import errorHandler from "../../handlers/errorHandler";
import { UPDATE_USER, AUTH_ERROR, CLEAR_ERROR } from "../../types";
import { API_URL } from "../../../constants";

//= =====================
// User Action Creators
//= =====================
export const addFunds = fundAmount => dispatch => {
  const headers = { headers: { Authorization: cookie.load("token") } };

  axios
    .put(`${API_URL}/user/add-funds`, { fundAmount }, headers)
    .then(response => {
      // Update user
      dispatch({
        type: UPDATE_USER,
        user: response.data.user
      });
    })
    .catch(error => {
      console.log("Add fund action:", error.response);

      errorHandler(dispatch, error, AUTH_ERROR);
    });
};

export const buyStock = (stockSymbol, shares) => dispatch => {
  dispatch({
    type: CLEAR_ERROR
  });

  const reqBody = {
    stockSymbol,
    shares,
    action: "BUY"
  };
  const headers = { headers: { Authorization: cookie.load("token") } };

  axios
    .post(`${API_URL}/user/stock/buy`, reqBody, headers)
    .then(response => {
      // Update user
      dispatch({
        type: UPDATE_USER,
        user: response.data.user
      });

      // Reroute to portfolio
      dispatch(push("/dashboard/portfolio"));
    })
    .catch(error => {
      errorHandler(dispatch, error, AUTH_ERROR);
    });
};

export const sellStock = (stockSymbol, shares) => dispatch => {
  const reqBody = {
    stockSymbol,
    shares,
    action: "SELL"
  };
  const headers = { headers: { Authorization: cookie.load("token") } };

  axios
    .post(`${API_URL}/user/stock/sell`, reqBody, headers)
    .then(response => {
      // Update user
      dispatch({
        type: UPDATE_USER,
        user: response.data.user
      });

      // Reroute to portfolio
      dispatch(push("/dashboard/portfolio"));
    })
    .catch(error => {
      errorHandler(dispatch, error, AUTH_ERROR);
    });
};
