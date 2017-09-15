import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, Message, Header } from "semantic-ui-react";

import { fetchQuote } from "../../../actions/quote";
import { fetchChartData } from "../../../actions/chartData";
import { getIsQuoteFetching, getQuoteErrorMessage } from "../../../reducers";
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
    this.props.scrollToChart();
    this.props.fetchQuote(symbol);
    this.props.fetchChartData(symbol, "intraDay");
    this.props.fetchChartData(symbol, "daily");
  };

  render() {
    const { quoteErrorMessage, quoteIsFetching, handleSubmit } = this.props;
    const containsError = quoteErrorMessage.length > 0;

    return (
      <div>
        <Header size="medium">Get current stock price and info:</Header>
        <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {renderFields(inputFields)}
          <Form.Button loading={quoteIsFetching}>Get Quote</Form.Button>
        </Form>
        {containsError && <Message error content={quoteErrorMessage} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quoteErrorMessage: getQuoteErrorMessage(state),
  quoteIsFetching: getIsQuoteFetching(state)
});

const createForm = reduxForm({
  form: "quoteStockForm",
  validate
});

export default connect(mapStateToProps, { fetchQuote, fetchChartData })(
  createForm(QuoteStockForm)
);
