import React from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import PropTypes from "prop-types";

import ScreenSize from "../../util/ScreenSize";
import HomePageButtonsAtMobileRes from "./HomePageButtonsAtMobileRes";
import HomePageAccordion from "./HomePageAccordion";

import { changeRoute } from "../../../actions/routing";
import { RESPONSIVE_LIMIT } from "../../../constants";

const divStyle = {
  maxWidth: "720px",
  margin: "0 auto"
};

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
        <HomePageAccordion isMobileRes={screenSize.width < RESPONSIVE_LIMIT} />
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
