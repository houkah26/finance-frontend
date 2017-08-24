import React, { Component } from "react";
import { connect } from "react-redux";
import { kebabCase, camelCase, round } from "lodash";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";

import { changeRoute } from "../../../actions/utility";

import NavBar from "../NavBar";
import NavDropdown from "../NavDropdown";

class NavMenu extends Component {
  static propTypes = {
    activeItem: PropTypes.string.isRequired,
    cash: PropTypes.string.isRequired,
    changeRoute: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  navToRoute = (e, data) => {
    const name = data.name || data.text;
    // convert name to dash case (ie. add-funds)
    const route = kebabCase(name);
    this.props.changeRoute(`/dashboard/${route}`);
  };

  render() {
    const { className, activeItem, cash } = this.props;

    const itemsToRender = [
      { name: "portfolio", onClick: this.navToRoute },
      { name: "history", onClick: this.navToRoute },
      { name: "buyStock", onClick: this.navToRoute },
      { name: "sellStock", onClick: this.navToRoute },
      { name: "addFunds", onClick: this.navToRoute },
      { name: "userInfo", onClick: this.navToRoute, position: "right" },
      {
        name: "funds",
        header: true,
        headerContent: `Cash Balance: $${cash}`
      }
    ];

    const dropdownHeader = `Funds: $${cash}`;

    return (
      <MediaQuery minDeviceWidth={793}>
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
                header={dropdownHeader}
              />}
      </MediaQuery>
    );
  }
}

const mapStateToProps = state => {
  return {
    // extract active item from path after /dashboard/ and convert to camelcase
    activeItem: camelCase(state.router.location.pathname.slice(11)),
    cash: round(state.auth.user.cash, 2).toFixed(2)
  };
};

export default connect(mapStateToProps, { changeRoute })(NavMenu);
