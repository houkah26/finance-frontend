import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { sortBy } from "lodash";
import PropTypes from "prop-types";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const sortData = (sortColumn, reverse, altSortKey, data) => {
  if (!sortColumn) {
    return data;
  }

  // Sort by altSortKey if exists otherwise sort by sortColumn
  const sortedData = sortBy(data, [altSortKey || sortColumn]);

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
    sortColumn: null,
    reverse: false,
    altSortKey: null,
    direction: null
  };

  handleSort = (clickedColumn, altSortKey) => () => {
    const { sortColumn, direction, reverse } = this.state;

    if (sortColumn !== clickedColumn) {
      this.setState({
        sortColumn: clickedColumn,
        reverse: false,
        altSortKey,
        direction: "ascending"
      });

      return;
    }

    this.setState({
      reverse: !reverse,
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { sortColumn, reverse, direction, altSortKey } = this.state;
    const { tableHeaders, tableData, tableFooter } = this.props;
    const sortedData = sortData(sortColumn, reverse, altSortKey, tableData);

    return (
      <Table sortable celled striped unstackable>
        <TableHeader
          tableHeaders={tableHeaders}
          sortColumn={sortColumn}
          direction={direction}
          handleSort={this.handleSort}
        />
        <TableBody tableData={sortedData} tableHeaders={tableHeaders} />
        {tableFooter && <TableFooter tableFooter={tableFooter} />}
      </Table>
    );
  }
}
