import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import { clearChartData } from "../../../actions/chartData";
import { clearQuote } from "../../../actions/quote";

import QuoteStockForm from "../../forms/QuoteStockForm";
import BuyStockForm from "../../forms/BuyStockForm";
import LineChartContainer from "../../chart";

class BuyStock extends Component {
  componentDidMount() {
    this.props.clearQuote();
    this.props.clearChartData();
  }

  render() {
    return (
      <div>
        <Grid className="buy-stock-container" stackable columns={2} divided>
          <Grid.Column>
            <QuoteStockForm />
          </Grid.Column>
          <Grid.Column>
            <BuyStockForm />
          </Grid.Column>
        </Grid>
        <br />
        <LineChartContainer />
      </div>
    );
  }
}

export default connect(null, { clearQuote, clearChartData })(BuyStock);
