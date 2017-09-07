import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, Message, Header } from "semantic-ui-react";

import { fetchQuote } from "../../../actions/quote";
import { fetchChartData } from "../../../actions/chartData";
import { getIsQuoteFetching, getQuoteErrorMessage } from "../../../reducers";
import { getIsChartDataFetching } from "../../../reducers";
import renderFields from "../components/renderFields";

// Input fields to render
const inputFields = [{ name: "stockSymbol", type: "text" }];

// Form validation for redux-form
const validate = (formProps, props) => {
  const errors = {};

  if (!formProps.stockSymbol) {
    errors.stockSymbol = "Please enter a symbol";
  }

  return errors;
};

class QuoteStockForm extends Component {
  handleFormSubmit = ({ stockSymbol }) => {
    const symbol = stockSymbol.toUpperCase();

    this.props.fetchQuote(symbol);
    this.props.fetchChartData(symbol, "week");
  };

  render() {
    const {
      quoteErrorMessage,
      quoteIsFetching,
      chartDataIsFetching,
      handleSubmit
    } = this.props;
    const containsError = quoteErrorMessage.length > 0;
    const isFetching = quoteIsFetching || chartDataIsFetching;

    return (
      <div>
        <Header size="medium">Get current stock price and info:</Header>
        <Form
          error={containsError}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          {renderFields(inputFields)}
          <Form.Button loading={isFetching}>Get Quote</Form.Button>
          <Message error content={quoteErrorMessage} />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quoteErrorMessage: getQuoteErrorMessage(state),
  quoteIsFetching: getIsQuoteFetching(state),
  chartDataIsFetching: getIsChartDataFetching(state)
});

const createForm = reduxForm({
  form: "quoteStockForm",
  validate
});

export default connect(mapStateToProps, { fetchQuote, fetchChartData })(
  createForm(QuoteStockForm)
);
