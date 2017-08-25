import { push } from "react-router-redux";

import { CLEAR_ERROR } from "../types";

//= =====================
// Utility Actions
//= =====================
export function changeRoute(route) {
  return function(dispatch) {
    dispatch({ type: CLEAR_ERROR });
    dispatch(push(route));
  };
}
