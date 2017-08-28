import React from "react";
import { Table } from "semantic-ui-react";
import PropTypes from "prop-types";

const TableHeader = ({ tableHeaders, sortColumn, direction, handleSort }) =>
  <Table.Header>
    <Table.Row>
      {tableHeaders.map(header =>
        <Table.HeaderCell
          sorted={sortColumn === header.key ? direction : null}
          onClick={handleSort(header.key, header.sortKey)}
          key={header.name}
        >
          {header.name}
        </Table.HeaderCell>
      )}
    </Table.Row>
  </Table.Header>;

TableHeader.propTypes = {
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sortKey: PropTypes.string
    })
  ).isRequired,
  sortColumn: PropTypes.string,
  direction: PropTypes.oneOf(["ascending", "descending"]),
  handleSort: PropTypes.func.isRequired
};

export default TableHeader;
