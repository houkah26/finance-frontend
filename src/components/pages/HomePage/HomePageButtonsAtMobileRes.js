import React from "react";
import { Button } from "semantic-ui-react";
import MediaQuery from "react-responsive";
// import PropTypes from "prop-types"; !!TO_DO!!

import { RESPONSIVE_LIMIT } from "../../../constants";

// Login/Register/Dashboard buttons for mobile resolutions
const HomePageButtonsAtMobileRes = ({
  authenticated,
  changeRoute,
  className
}) => (
  <MediaQuery maxWidth={RESPONSIVE_LIMIT}>
    <div className={className}>
      {authenticated ? (
        <Button color="grey" fluid onClick={() => changeRoute("/dashboard")}>
          Go To Dashboard
        </Button>
      ) : (
        <Button.Group size="large" fluid widths="2" color="grey">
          <Button onClick={() => changeRoute("/login")}>Login</Button>
          <Button.Or />
          <Button onClick={() => changeRoute("/register")}>Register</Button>
        </Button.Group>
      )}
    </div>
  </MediaQuery>
);

export default HomePageButtonsAtMobileRes;
