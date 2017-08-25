import cookie from "react-cookie";
import { push } from "react-router-redux";

import { AUTH_USER } from "../types";

// Login handler for setting token, user info, and auth status on
// succesfull authentication
const loginHandler = (dispatch, token, user) => {
  // set web token
  cookie.save("token", token, { path: "/" });

  // set auth status to true and set user info
  dispatch({
    type: AUTH_USER,
    user: user
  });

  // reroute to dashboard
  dispatch(push("/dashboard"));
};

export default loginHandler;
