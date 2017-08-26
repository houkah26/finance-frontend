import React from "react";
import { Header, List, Grid } from "semantic-ui-react";

const TradingPerformance = ({ username, firstName, lastName, joinedDate }) =>
  <Grid.Column>
    <Header dividing size="medium">
      User Information
    </Header>
    <List divided>
      <List.Item>
        <List.Header>Username</List.Header>
        {username}
      </List.Item>
      <List.Item>
        <List.Header>First Name</List.Header>
        {firstName}
      </List.Item>
      <List.Item>
        <List.Header>Last Name</List.Header>
        {lastName}
      </List.Item>
      <List.Item>
        <List.Header>Joined</List.Header>
        {joinedDate}
      </List.Item>
    </List>
  </Grid.Column>;

export default TradingPerformance;
