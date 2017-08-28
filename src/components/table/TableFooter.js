import React from "react";
import { Table } from "semantic-ui-react";
import PropTypes from "prop-types";

const TableFooter = ({ tableFooter }) =>
  <Table.Header>
    <Table.Row>
      {tableFooter.map((tableCell, index) =>
        <Table.HeaderCell key={index}>
          {tableCell}
        </Table.HeaderCell>
      )}
    </Table.Row>
  </Table.Header>;

TableFooter.propTypes = {
  tableFooter: PropTypes.array.isRequired
};

export default TableFooter;
