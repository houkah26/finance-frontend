import React from "react";
import { Table } from "semantic-ui-react";
import PropTypes from "prop-types";

const TableBody = ({ tableData, tableHeaders }) =>
  <Table.Body>
    {tableData.map((stock, index) =>
      <Table.Row key={stock.stockSymbol + index}>
        {tableHeaders.map(header =>
          <Table.Cell key={header.key}>
            {stock[header.key]}
          </Table.Cell>
        )}
      </Table.Row>
    )}
  </Table.Body>;

TableBody.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sortKey: PropTypes.string
    })
  ).isRequired
};

export default TableBody;
