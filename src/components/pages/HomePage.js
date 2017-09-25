import React from "react";
import { connect } from "react-redux";
import { Header, Button } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";

import ScreenSize from "../util/ScreenSize";
// import CollapsibleList from "../list/CollapsibleList";

import { changeRoute } from "../../actions/routing";
import { RESPONSIVE_LIMIT } from "../../constants";

const divStyle = {
  maxWidth: "720px",
  margin: "0 auto"
};

const ulStyle = {
  marginTop: "0"
};

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

const HomePage = ({ authenticated, changeRoute }) => (
  <ScreenSize>
    {screenSize => (
      <div style={divStyle}>
        <Header size="large">Welcome to React Finance</Header>
        <p>
          Stock trading simulator where authenticated users can quote, buy, and
          stock based on real time stock data. This app was built using
          Full-Stack JavaScript (Node, Express, MongoDB, and React) as a
          personal project to become more familiar with the modern React
          front-end ecosystem. See footer below for links to source code.
        </p>
        <HomePageButtonsAtMobileRes
          authenticated={authenticated}
          changeRoute={changeRoute}
        />
        <div>
          <Header size="medium">Features</Header>
          <ul style={ulStyle}>
            <li>User Authentication utilizing JSON Web Tokens</li>
            <li>
              Real time (15 minute delay) stock prices via a Yahoo API from the
              back-end
            </li>
            <li>Buy and sell stocks</li>
            <li>View sortable stock portfolio and transaction history</li>
            <li>Add funds/cash (no real money)</li>
            <li>Time series stock charts, data via Alpha Vantage API</li>
            <li>
              User info page which also shows trading performance (net gain)
            </li>
            <li>Responsive layout</li>
            <li>Progressive Web App</li>
          </ul>
        </div>
        <div>
          <Header size="medium">Technologies</Header>
          <div>
            <Header sub>Front-End</Header>
            <ul style={ulStyle}>
              <li>Framework: React</li>
              <li>State management: Redux</li>
              <li>UI: Semantic-UI</li>
              <li>
                Client Side Routing: React-Router (as well as
                React-Router-Redux)
              </li>
              <li>Form management/validation: Redux Form</li>
              <li>Deployment: Heroku</li>
              <li>Bootstrapped with Create-React-App</li>
            </ul>
          </div>
          <div>
            <Header sub>Back-End</Header>
            <ul style={ulStyle}>
              <li>Language: Node-JS</li>
              <li>Framework: Express</li>
              <li>Database: MongoDB and Mongoose (for express integration)</li>
              <li>Authentication: PassportJS</li>
              <li>Deployment: Heroku</li>
            </ul>
          </div>
        </div>
      </div>
    )}
  </ScreenSize>
);

HomePage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  changeRoute: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { changeRoute })(HomePage);
