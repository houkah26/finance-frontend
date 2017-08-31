import React from "react";
import { connect } from "react-redux";
import { Header, Button } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";

import { changeRoute } from "../../actions/routing";
import { RESPONSIVE_LIMIT } from "../../constants";

const HomePage = ({ authenticated, changeRoute }) => (
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
      {authenticated ? (
        <Button fluid onClick={() => changeRoute("/dashboard")}>
          Go To Dashboard
        </Button>
      ) : (
        <Button.Group size="large" fluid>
          <Button onClick={() => changeRoute("/login")}>Login</Button>
          <Button.Or />
          <Button onClick={() => changeRoute("/register")}>Register</Button>
        </Button.Group>
      )}
    </MediaQuery>
  </div>
);

HomePage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  changeRoute: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { changeRoute })(HomePage);
