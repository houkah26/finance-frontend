import React from "react";
import { connect } from "react-redux";
import { Header, Button } from "semantic-ui-react";
import MediaQuery from "react-responsive";

import { changeRoute } from "../../actions/utility";
import { RESPONSIVE_LIMIT } from "../../constants";

const HomePage = ({ changeRoute }) =>
  <div>
    <Header>Welcome to React Finance</Header>
    <p>
      A web application where users can buy and sell stock (no real money
      required). Please pardon the initial load time, the back-end server hosted
      for free on Heroku has to be woken up after an extended period without
      receiving traffic.
    </p>
    <p>
      This app was built using Full-Stack JavaScript (Node, Express, MongoDB,
      and React) as a personal project to become more familiar with the modern
      React front-end ecosystem. See footer below for links to source code.
    </p>
    <br />
    <MediaQuery maxWidth={RESPONSIVE_LIMIT}>
      <Button.Group size="large" fluid>
        <Button onClick={() => changeRoute("/login")}>Login</Button>
        <Button.Or />
        <Button onClick={() => changeRoute("/register")}>Register</Button>
      </Button.Group>
    </MediaQuery>
  </div>;

export default connect(null, { changeRoute })(HomePage);
