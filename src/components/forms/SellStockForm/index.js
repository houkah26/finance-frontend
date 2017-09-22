import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { Dropdown, Header, Grid } from "semantic-ui-react";

import { isPositiveInt } from "../helperFunctions";
import { sellStock } from "../../../actions/auth/user";
import { clearAuthErrors } from "../../../actions/auth";

import SelectedStockInfoList from "./SelectedStockInfoList";
import SellSharesForm from "./SellSharesForm";

// Input fields to render
const inputFields = [{ name: "numberOfShares", type: "number" }];

// Form validationg for redux-form
const validate = (formProps, props) => {
  const errors = {};

  const numberOfShares = parseFloat(formProps.numberOfShares);

  if (!isPositiveInt(numberOfShares)) {
    errors.numberOfShares = "Please enter a valid number of shares.";
  }

  return errors;
};

// Create array of stock selection dropdown options from portfolio
const mapStockOptions = portfolio => {
  return portfolio.map(stock => {
    return {
      key: stock.stockSymbol,
      value: stock.stockSymbol,
      text: stock.stockSymbol
    };
  });
};

class SellStockForm extends Component {
  static propTypes = {
    portfolio: PropTypes.arrayOf(
      PropTypes.shape({
        stockSymbol: PropTypes.string.isRequired,
        stockName: PropTypes.string.isRequired,
        totalShares: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
        total: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    clearAuthErrors: PropTypes.func.isRequired,
    sellStock: PropTypes.func.isRequired,
    sellStockErrorMessage: PropTypes.string
  };

  state = {
    selectedStock: null,
    isLoading: false
  };

  handleStockSelection = (e, { value }) => {
    this.props.portfolio.forEach(stock => {
      if (stock.stockSymbol === value) {
        this.setState({ selectedStock: stock });
      }
    });
  };

  handleSellSharesFormSubmit = formProps => {
    const { clearAuthErrors, sellStock } = this.props;

    // Clear any errors from previous form submission
    clearAuthErrors();

    // Set form loading state to true
    this.setState({ isLoading: true });

    sellStock(this.state.selectedStock.stockSymbol, formProps.numberOfShares);
  };

  render() {
    const { selectedStock, isLoading } = this.state;
    const { handleSubmit, sellStockErrorMessage, portfolio } = this.props;
    const stockDropdownOptions = mapStockOptions(portfolio);
    const sellStockContainsError = sellStockErrorMessage.length > 0;

    return (
      <Grid stackable columns={2} divided className="sell-stock-container">
        <Grid.Column>
          <Header size="medium">Stock to sell</Header>
          <Dropdown
            placeholder="Select a Stock"
            search
            selection
            fluid
            options={stockDropdownOptions}
            onChange={this.handleStockSelection}
          />
          <br />
          {selectedStock && (
            <SellSharesForm
              containsError={sellStockContainsError}
              onSubmit={handleSubmit(this.handleSellSharesFormSubmit)}
              inputFields={inputFields}
              isLoading={isLoading}
              errorMessage={sellStockErrorMessage}
            />
          )}
        </Grid.Column>
        <Grid.Column>
          <Header size="medium">Selected Stock Info</Header>
          {selectedStock && (
            <SelectedStockInfoList selectedStock={selectedStock} />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { sellStockErrorMessage: state.auth.errorMessage };
};

const createForm = reduxForm({
  form: "sellStock",
  validate
});

export default connect(mapStateToProps, { sellStock, clearAuthErrors })(
  createForm(SellStockForm)
);
