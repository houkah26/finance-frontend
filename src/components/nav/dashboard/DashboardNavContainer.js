import React, { Component } from "react";
import { connect } from "react-redux";
import { round } from "lodash";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";

import { changeRoute } from "../../../actions/utility";
import { RESPONSIVE_LIMIT } from "../../../constants";

import NavBar from "../NavBar";
import NavDropdown from "../NavDropdown";

class NavMenu extends Component {
  static propTypes = {
    activeItem: PropTypes.string.isRequired,
    cash: PropTypes.string.isRequired,
    changeRoute: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  navToRoute = route => {
    this.props.changeRoute(`/dashboard/${route}`);
  };

  render() {
    const { className, activeItem, cash } = this.props;

    const itemsToRender = [
      { route: "portfolio", content: "Portfolio", onClick: this.navToRoute },
      { route: "history", content: "History", onClick: this.navToRoute },
      { route: "buy-stock", content: "Buy Stock", onClick: this.navToRoute },
      { route: "sell-stock", content: "Sell Stock", onClick: this.navToRoute },
      { route: "add-funds", content: "Add Funds", onClick: this.navToRoute },
      {
        route: "user-info",
        content: "User Info",
        onClick: this.navToRoute,
        position: "right"
      },
      {
        header: true,
        content: `Funds: $${cash}`
      }
    ];

    return (
      <MediaQuery minWidth={RESPONSIVE_LIMIT}>
        {matches =>
          matches
            ? <NavBar
                itemsToRender={itemsToRender}
                activeItem={activeItem}
                className={className}
                tabular
                attached="top"
              />
            : <NavDropdown
                itemsToRender={itemsToRender.slice(0, -1)}
                activeItem={activeItem}
                className={className}
                header={itemsToRender.slice(-1)[0].content}
              />}
      </MediaQuery>
    );
  }
}

const mapStateToProps = state => {
  return {
    // extract active item from path after /dashboard/ and convert to camelcase
    activeItem: state.router.location.pathname.slice(11),
    cash: round(state.auth.user.cash, 2).toFixed(2)
  };
};

export default connect(mapStateToProps, { changeRoute })(NavMenu);
