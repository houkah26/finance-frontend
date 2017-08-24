import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser } from "../../../actions/auth";
import { changeRoute } from "../../../actions/utility";

import NavBar from "../NavBar";

const extractRootPath = currentPath => {
  // check for presence of route (second slash: ie /dashboard/something)
  const secondSlashIndex = currentPath.indexOf("/", 1);

  if (secondSlashIndex > -1) {
    return currentPath.slice(1, secondSlashIndex);
  } else {
    return currentPath.slice(1);
  }
};

class NavMenu extends Component {
  static propTypes = {
    activeItem: PropTypes.string.isRequired,
    username: PropTypes.string,
    changeRoute: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    className: PropTypes.string
  };

  state = {
    collapsed: true
  };

  navToRoute = name => {
    const route = `/${name}`;
    this.props.changeRoute(route);
  };

  handleMenuClick = (e, { name }) => {
    const { activeItem } = this.props;

    if (activeItem !== name) {
      this.navToRoute(name);
    }

    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleLogoutClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
    this.props.logoutUser();
  };

  render() {
    const {
      username,
      activeItem,
      authenticated: isAuthenticated,
      className
    } = this.props;
    const { collapsed } = this.state;

    const homepageItem = [
      {
        name: "",
        icon: { name: "home", size: "large" },
        onClick: this.handleMenuClick
      }
    ];
    const isAuthItems = [
      {
        name: "dashboard",
        icon: { name: "browser", size: "large" },
        onClick: this.handleMenuClick
      },
      {
        name: "username",
        header: true,
        position: "right",
        headerContent: `Logged in as ${username}`
      },
      {
        name: "logout",
        icon: { name: "sign out", size: "large" },
        onClick: this.handleLogoutClick
      }
    ];
    const notAuthItems = [
      {
        name: "register",
        icon: { name: "signup", size: "large" },
        onClick: this.handleMenuClick,
        position: "right"
      },
      {
        name: "login",
        icon: { name: "sign in", size: "large" },
        onClick: this.handleMenuClick
      }
    ];

    const itemsToRender = homepageItem.concat(
      isAuthenticated ? isAuthItems : notAuthItems
    );

    return (
      <NavBar
        itemsToRender={itemsToRender}
        activeItem={activeItem}
        className={className}
        collapsed={collapsed}
        stackable
        inverted
        size="huge"
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    activeItem: extractRootPath(state.router.location.pathname),
    username: state.auth.user.username
  };
};

export default connect(mapStateToProps, { logoutUser, changeRoute })(NavMenu);
