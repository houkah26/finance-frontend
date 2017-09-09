import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, Message, Header, Button } from "semantic-ui-react";
import axios from "axios";
import cookie from "react-cookie";
import { round } from "lodash";
import PropTypes from "prop-types";

import { isPositiveInt } from "../helperFunctions";
import { buyStock } from "../../../actions/auth/user";
import { API_URL } from "../../../constants";
import renderFields from "../components/renderFields";

import "./BuyStockForm.css";

// Input fields to render
const inputFields = [
  { name: "stockSymbol", type: "text" },
  { name: "numberOfShares", type: "number" }
];

// Initial state
const inititalState = {
  quoteSymbol: "",
  quotePrice: 0,
  numShares: 0,
  totalCost: 0,
  quoteErrorMessage: "",
  quoteIsLoading: false,
  quoteIsSuccesfull: false,
  buyIsLoading: false
};

// Form validation for redux-form
const validate = (formProps, props) => {
  const errors = {};

  if (!formProps.stockSymbol) {
    errors.stockSymbol = "Please enter a symbol";
  }

  const numberOfShares = parseFloat(formProps.numberOfShares);
  if (!isPositiveInt(numberOfShares)) {
    errors.numberOfShares = "Please enter a valid number";
  }

  return errors;
};

class BuyStockForm extends Component {
  static propTypes = {
    buyErrorMessage: PropTypes.string,
    buyStock: PropTypes.string.isRequired
  };

  state = inititalState;

  handleFormSubmit = formProps => {
    this.setState({ ...inititalState, quoteIsLoading: true });
    this.fetchQuote(formProps.stockSymbol, formProps.numberOfShares);
  };

  fetchQuote = (stockSymbol, numberOfShares) => {
    const headers = { headers: { Authorization: cookie.load("token") } };

    axios
      .post(`${API_URL}/user/stock/quote`, { stockSymbol }, headers)
      .then(response => {
        const { data } = response;

        this.setState({
          ...inititalState,
          quoteSymbol: data.stockSymbol,
          quotePrice: round(data.price, 2).toFixed(2),
          numShares: numberOfShares,
          totalCost: round(data.price * numberOfShares, 2),
          quoteIsSuccesfull: true
        });
      })
      .catch(error => {
        this.setState({
          ...inititalState,
          quoteErrorMessage: error.response.data.message
        });
      });
  };

  handleBuyClick = () => {
    this.setState({
      buyIsLoading: true
    });

    const { quoteSymbol, numShares } = this.state;
    // On success buy stock will redirect to dashboard
    this.props.buyStock(quoteSymbol, numShares);
  };

  render() {
    const {
      quoteSymbol,
      numShares,
      totalCost,
      quoteErrorMessage,
      quoteIsLoading,
      quoteIsSuccesfull,
      buyIsLoading
    } = this.state;

    const { handleSubmit, buyErrorMessage } = this.props;

    const quoteContainsError = quoteErrorMessage.length > 0;
    const buyContainsError = buyErrorMessage.length > 0;

    return (
      <div className="buy-stock-form">
        <Header size="medium">Buy Stock:</Header>
        <Form
          error={quoteContainsError}
          success={quoteIsSuccesfull}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <Form.Group widths="equal">{renderFields(inputFields)}</Form.Group>
          <Form.Button loading={quoteIsLoading}>
            Calculate Transaction Cost
          </Form.Button>
          <Message error content={quoteErrorMessage} />
        </Form>
        <Message
          className="success-message"
          success
          hidden={!quoteIsSuccesfull}
        >
          <span
          >{`${numShares} shares of ${quoteSymbol} costs $${totalCost.toFixed(
            2
          )}`}</span>
          {quoteIsSuccesfull && (
            <Button
              size="mini"
              positive
              compact
              floated="right"
              onClick={this.handleBuyClick}
              loading={buyIsLoading && !buyContainsError}
            >
              Purchase
            </Button>
          )}
        </Message>
        <br />
        <Message error hidden={!buyContainsError}>
          {buyErrorMessage}
        </Message>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  buyErrorMessage: state.auth.errorMessage
});

const createForm = reduxForm({
  form: "buyStockForm",
  validate
});

export default connect(mapStateToProps, { buyStock })(createForm(BuyStockForm));
