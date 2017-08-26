import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { sortBy } from "lodash";

const sortData = (column, reverse, altSortKey, data) => {
  if (!column) {
    return data;
  }

  const sortedData = sortBy(data, [altSortKey || column]);

  return reverse ? sortedData.reverse() : sortedData;
};

export default class TableSortable extends Component {
  state = {
    column: null,
    reverse: false,
    altSortKey: null,
    direction: null
  };

  // componentDidMount() {
  //   this.setState({ data: this.props.tableData });
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.tableData !== this.props.Tabledata) {
  //     this.setState({ data: nextProps.Tabledata });
  //   }
  // }

  handleSort = (clickedColumn, altSortKey) => () => {
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        reverse: false,
        altSortKey,
        // data: sortBy(data, [altSortKey || clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      reverse: true,
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  renderFooter = () => {
    const { tableFooter } = this.props;

    if (tableFooter) {
      return (
        <Table.Header>
          <Table.Row>
            {tableFooter.map((tableCell, index) =>
              <Table.HeaderCell key={index}>
                {tableCell}
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
      );
    }
  };

  render() {
    const { column, reverse, direction, altSortKey } = this.state;
    const { tableHeaders, tableData } = this.props;
    const sortedData = sortData(column, reverse, altSortKey, tableData);

    return (
      <Table sortable celled striped unstackable>
        <Table.Header>
          <Table.Row>
            {tableHeaders.map(header =>
              <Table.HeaderCell
                sorted={column === header.key ? direction : null}
                onClick={this.handleSort(header.key, header.sortKey)}
                key={header.name}
              >
                {header.name}
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData.map((stock, index) =>
            <Table.Row key={stock.stockSymbol + index}>
              {tableHeaders.map(header =>
                <Table.Cell key={header.key}>
                  {stock[header.key]}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        {this.renderFooter()}
      </Table>
    );
  }
}
