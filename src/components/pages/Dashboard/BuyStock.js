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

  scrollToChart = () => {
    this.chart.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  render() {
    return (
      <div>
        <Grid className="buy-stock-container" stackable columns={2} divided>
          <Grid.Column>
            <QuoteStockForm scrollToChart={this.scrollToChart} />
          </Grid.Column>
          <Grid.Column>
            <BuyStockForm />
          </Grid.Column>
        </Grid>
        <br />
        <div
          ref={chart => {
            this.chart = chart;
          }}
        >
          <ChartContainer />
        </div>
      </div>
    );
  }
}

export default connect(null, { clearQuote, clearChartData })(BuyStock);
