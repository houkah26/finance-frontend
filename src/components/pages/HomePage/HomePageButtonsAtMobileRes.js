import React from "react";
import { Button } from "semantic-ui-react";
import MediaQuery from "react-responsive";
// import PropTypes from "prop-types"; !!TO_DO!!

import { RESPONSIVE_LIMIT } from "../../../constants";

// Login/Register/Dashboard buttons for mobile resolutions
const HomePageButtonsAtMobileRes = ({ authenticated, changeRoute }) => (
  <MediaQuery maxWidth={RESPONSIVE_LIMIT}>
    <div style={{ marginBottom: "1rem" }}>
      {authenticated ? (
        <Button fluid onClick={() => changeRoute("/dashboard")}>
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
