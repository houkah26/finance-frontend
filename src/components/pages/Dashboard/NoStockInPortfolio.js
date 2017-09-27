import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Button } from "semantic-ui-react";

import { changeRoute } from "../../../actions/routing";

const divStyle = {
  padding: '1rem'
}

class NoStockInPortfolio extends Component {
  handleClick = () => {
    this.props.changeRoute("/dashboard/buy-stock");
  };

  render() {
    return (
      <div style={divStyle}>
        <Header size="medium">
          You currently have no stock in your portfolio.
        </Header>
        <Button onClick={this.handleClick}>Go to Buy Stock Form</Button>
      </div>
    );
  }
}

export default connect(null, { changeRoute })(NoStockInPortfolio);
