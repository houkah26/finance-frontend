import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ScreenSize extends Component {
  static defaultProps = {
    className: ""
  };

  static propTypes = {
    children: PropTypes.func.isRequired,
    className: PropTypes.string
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
    const { className, children } = this.props;

    // Render components once width has been set
    return width ? (
      <div className={className}>{children(this.state)}</div>
    ) : null;
  }
}
