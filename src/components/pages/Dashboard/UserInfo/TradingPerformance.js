import React from "react";
import { Header, List, Grid } from "semantic-ui-react";

const TradingPerformance = ({
  cash,
  cashAdded,
  startingFunds,
  totalValue,
  netGain
}) =>
  <Grid.Column>
    <Header dividing size="medium">
      Trading Performance
    </Header>
    <List divided>
      <List.Item>
        <List.Header>Cash Balance</List.Header>
        {`$${cash.toFixed(2)}`}
      </List.Item>
      <List.Item>
        <List.Header>Funds Added</List.Header>
        {`$${cashAdded.toFixed(2)}`}
      </List.Item>
      <List.Item>
        <List.Header>Starting Funds</List.Header>
        {`$${startingFunds.toFixed(2)}`}
      </List.Item>
      <List.Item>
        <List.Header>Current Portfolio Value</List.Header>
        {`$${totalValue.toFixed(2)}`}
      </List.Item>
      <List.Item>
        <List.Header>Net Gain</List.Header>
        {`$${netGain.toFixed(2)}`}
      </List.Item>
    </List>
  </Grid.Column>;

export default TradingPerformance;
