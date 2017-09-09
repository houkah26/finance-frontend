import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearChartData } from "../../../actions/chartData";
import { clearQuote } from "../../../actions/quote";

import QuoteStockForm from "../../forms/QuoteStockForm";
import BuyStockForm from "../../forms/BuyStockForm";
import ChartContainer from "../../chart";

class BuyStock extends Component {
  static propTypes = {
    clearQuote: PropTypes.func.isRequired,
    clearChartData: PropTypes.func.isRequired
  };

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
        <ChartContainer />
      </div>
    );
  }
}

export default connect(null, { clearQuote, clearChartData })(BuyStock);
