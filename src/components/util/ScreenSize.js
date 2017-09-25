import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ScreenSize extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  state = { width: "0", height: "0" };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    return <div>{this.props.children(this.state)}</div>;
  }
}
