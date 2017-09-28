import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ScreenSize extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  state = { width: null, height: null };

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
    const { width } = this.state;

    // Render components once width has been set
    return width ? <div>{this.props.children(this.state)}</div> : null;
  }
}
