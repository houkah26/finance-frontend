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
export const fetchStock = dataType => (dispatch, getState) => {
  if (getIsStockFetching(getState(), dataType)) {
    return;
  }

  dispatch({
    type: FETCH_STOCK_REQUEST,
    dataType // history or portfolio
  });

  axios
    .get(`${API_URL}/user/${dataType}`, {
      headers: { Authorization: cookie.load("token") }
    })
    .then(response => {
      dispatch({
        type: FETCH_STOCK_SUCCESS,
        payload: response.data[dataType],
        dataType
      });
    })
    .catch(error => {
      errorHandler(dispatch, error, FETCH_STOCK_FAILURE, dataType);
    });
};
