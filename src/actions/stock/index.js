import axios from "axios";
import cookie from "react-cookie";

import {
  FETCH_STOCK_REQUEST,
  FETCH_STOCK_SUCCESS,
  FETCH_STOCK_FAILURE
} from "../types.js";
import { API_URL } from "../../constants";
import errorHandler from "../handlers/errorHandler";
import { getIsStockFetching } from "../../reducers/index";

//= =====================
// Stock Action Creators
//= =====================
export const fetchStock = listType => (dispatch, getState) => {
  if (getIsStockFetching(getState(), listType)) {
    return;
  }

  dispatch({
    type: FETCH_STOCK_REQUEST,
    listType // history or portfolio
  });

  axios
    .get(`${API_URL}/user/${listType}`, {
      headers: { Authorization: cookie.load("token") }
    })
    .then(response => {
      dispatch({
        type: FETCH_STOCK_SUCCESS,
        payload: response.data[listType],
        listType
      });
    })
    .catch(error => {
      console.log("fetch stock:", error);

      errorHandler(dispatch, error.response, FETCH_STOCK_FAILURE);
    });
};
