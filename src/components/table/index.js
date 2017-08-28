import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { sortBy } from "lodash";
import PropTypes from "prop-types";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const sortData = (column, reverse, altSortKey, data) => {
  if (!column) {
    return data;
  }

  // Sort by altSortKey if exists otherwise sort by column
  const sortedData = sortBy(data, [altSortKey || column]);

  return reverse ? sortedData.reverse() : sortedData;
};

export default class TableSortable extends Component {
  static propTypes = {
    tableHeaders: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sortKey: PropTypes.string
      })
    ).isRequired,
    tableData: PropTypes.array.isRequired,
    tableFooter: PropTypes.array
  };

  state = {
    column: null,
    reverse: false,
    altSortKey: null,
    direction: null
  };

  handleSort = (clickedColumn, altSortKey) => () => {
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        reverse: false,
        altSortKey,
        direction: "ascending"
      });

      return;
    }

    this.setState({
      reverse: true,
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, reverse, direction, altSortKey } = this.state;
    const { tableHeaders, tableData, tableFooter } = this.props;
    const sortedData = sortData(column, reverse, altSortKey, tableData);

    return (
      <Table sortable celled striped unstackable>
        <TableHeader
          tableHeaders={tableHeaders}
          sortColumn={column}
          direction={direction}
          handleSort={this.handleSort}
        />
        <TableBody tableData={sortedData} tableHeaders={tableHeaders} />
        {tableFooter && <TableFooter tableFooter={tableFooter} />}
      </Table>
    );
  }
}
