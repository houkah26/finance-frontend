import React from "react";
import { Grid } from "semantic-ui-react";

import QuoteStockForm from "../../forms/QuoteStockForm";
import BuyStockForm from "../../forms/BuyStockForm";

const BuyStock = () =>
  <Grid className="buy-stock-container" stackable columns={2} divided>
    <Grid.Column>
      <QuoteStockForm />
    </Grid.Column>
    <Grid.Column>
      <BuyStockForm />
    </Grid.Column>
  </Grid>;

export default BuyStock;
