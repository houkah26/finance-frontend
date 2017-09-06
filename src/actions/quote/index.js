import axios from "axios";
import cookie from "react-cookie";

import {
  FETCH_QUOTE_REQUEST,
  FETCH_QUOTE_SUCCESS,
  FETCH_QUOTE_FAILURE,
  CLEAR_QUOTE
} from "../types.js";
import { API_URL } from "../../constants";
import errorHandler from "../handlers/errorHandler";
import { getIsQuoteFetching } from "../../reducers/index";

//= =====================
// Quote Action Creators
//= =====================
export const fetchQuote = stockSymbol => (dispatch, getState) => {
  if (getIsQuoteFetching(getState())) {
    return;
  }

  dispatch({
    type: FETCH_QUOTE_REQUEST
  });

  const headers = { headers: { Authorization: cookie.load("token") } };

  axios
    .post(`${API_URL}/user/stock/quote`, { stockSymbol }, headers)
    .then(response => {
      dispatch({
        type: FETCH_QUOTE_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      console.log("quote stock:", error);

      errorHandler(dispatch, error.response, FETCH_QUOTE_FAILURE);
    });
};

export const clearQuote = () => dispatch => {
  dispatch({
    type: CLEAR_QUOTE
  });
};
