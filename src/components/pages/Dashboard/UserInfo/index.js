import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { fetchStock } from "../../../../actions/stock";
import {
  getIsStockFetching,
  getStockErrorMessage,
  getStockTotalValue
} from "../../../../reducers";

import { Grid } from "semantic-ui-react";
import UserInfo from "./UserInfo";
import TradingPerformance from "./TradingPerformance";

class UserInfoContainer extends Component {
  componentDidMount() {
    this.props.fetchStock("portfolio");
  }

  render() {
    const { totalValue, user } = this.props;
    const { firstName, lastName, username, joined, cash, cashAdded } = user;
    const startingFunds = 1000;
    const netGain = cash + totalValue - (startingFunds + cashAdded);
    const joinedDate = moment(joined).format("MMMM Do, YYYY");

    return (
      <Grid stackable columns={2} divided>
        <UserInfo
          username={username}
          firstName={firstName}
          lastName={lastName}
          joinedDate={joinedDate}
        />
        <TradingPerformance
          cash={cash}
          cashAdded={cashAdded}
          startingFunds={startingFunds}
          totalValue={totalValue}
          netGain={netGain}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const listType = "portfolio";

  return {
    user: state.auth.user,
    totalValue: getStockTotalValue(state, listType),
    isStockFetching: getIsStockFetching(state, listType),
    errorMessage: getStockErrorMessage(state, listType)
  };
};

export default connect(mapStateToProps, { fetchStock })(UserInfoContainer);
