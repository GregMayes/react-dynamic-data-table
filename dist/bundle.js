import React, { Component } from 'react';
import DynamicDataTable from "../DynamicDataTable";

class DataRow extends Component {
  render() {
    return React.createElement("tr", {
      key: row.id
    }, this.renderCheckboxCell(row.id), this.props.fields.map(field => this.renderCell(field, row)), this.renderButtons(row));
  }

  renderCheckboxCell(value) {
    if (!this.props.renderCheckboxes) {
      return;
    }

    const checkbox = React.createElement("div", {
      className: "form-check"
    }, React.createElement("input", {
      type: "checkbox",
      value: value,
      checked: this.props.checkboxIsChecked(value),
      onChange: e => this.props.checkboxChange(e)
    }));

    if (value === 'all') {
      return React.createElement("th", null, checkbox);
    }

    return React.createElement("td", null, checkbox);
  }

  renderCell(field, row) {
    let value = row[field.name];
    value = this.props.dataItemManipulator(field.name, value);

    if (typeof value === 'object' || typeof value === 'array') {
      value = JSON.stringify(value);
    }

    return React.createElement("td", {
      key: `${row.id}_${field.name}`
    }, value);
  }

  renderButtons(row) {
    const buttons = this.props.buttons;

    if (!buttons.length) {
      return React.createElement("td", null);
    }

    if (buttons.length === 1) {
      return React.createElement("td", null, React.createElement("button", {
        type: "button",
        className: "btn btn-primary",
        onClick: () => {
          buttons[0].callback(row);
        }
      }, buttons[0].name));
    }

    return React.createElement("td", null, React.createElement("div", {
      className: "btn-group"
    }, React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      onClick: () => {
        buttons[0].callback(row);
      }
    }, buttons[0].name), React.createElement("button", {
      type: "button",
      className: "btn btn-primary dropdown-toggle dropdown-toggle-split",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }, React.createElement("span", {
      className: "sr-only"
    }, "Toggle Dropdown")), React.createElement("div", {
      className: "dropdown-menu",
      "aria-labelledby": "dropdownMenuButton"
    }, buttons.map((button, index) => this.renderButton(button, index, row)))));
  }

  renderButton(button, index, row) {
    if (index === 0) {
      return;
    }

    return React.createElement("div", {
      style: {
        cursor: 'pointer'
      },
      key: `button_${button.name}`,
      className: "dropdown-item",
      onClick: () => {
        button.callback(row);
      }
    }, button.name);
  }

}

DataRow.propTypes = {
  row: PropTypes.object,
  buttons: PropTypes.array,
  checkboxIsChecked: PropTypes.func,
  checkboxChange: PropTypes.func,
  dataItemManipulator: PropTypes.func
};
export default DynamicDataTable;
import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    const pageLinks = [];
    const props = this.props;
    const currentPage = props.currentPage;
    const totalPages = props.totalPages;

    if (totalPages <= 1) {
      return;
    }

    for (let i = 1; i <= totalPages; i++) {
      pageLinks.push(React.createElement("li", {
        key: `page_${i}`,
        className: `page-item ${currentPage === i ? 'active' : ''}`
      }, React.createElement("button", {
        type: "button",
        className: "page-link",
        onClick: () => this.changePage(i)
      }, i)));
    }

    return React.createElement("nav", {
      "aria-label": "Page navigation"
    }, React.createElement("ul", {
      className: "pagination"
    }, React.createElement("li", {
      className: `page-item ${currentPage <= 1 ? 'disabled' : ''}`
    }, React.createElement("button", {
      type: "button",
      className: "page-link",
      onClick: () => this.previousPage()
    }, "Previous")), pageLinks, React.createElement("li", {
      className: `page-item ${currentPage >= totalPages ? 'disabled' : ''}`
    }, React.createElement("button", {
      type: "button",
      className: "page-link",
      onClick: () => this.nextPage()
    }, "Next"))));
  }

  changePage(page) {
    this.props.changePage(page);
  }

  previousPage() {
    if (this.props.currentPage > 1) {
      this.changePage(this.props.currentPage - 1);
    }
  }

  nextPage() {
    if (this.props.currentPage < this.props.totalPages) {
      this.changePage(this.props.currentPage + 1);
    }
  }

}

DataRow.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  changePage: PropTypes.func
};
export default Pagination;
import React, { Component } from 'react';
import DataRow from "./Components/DataRow";
import Pagination from "./Components/Pagination";

class DynamicDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRowIds: []
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.rows !== this.props.rows) {
      this.setState({
        checkedRowIds: []
      });
    }
  }

  getFields() {
    const rows = this.props.rows;
    const fields = [];
    let fieldsToExclude = this.props.fieldsToExclude;
    let fieldMap = this.props.fieldMap;

    if (!fieldsToExclude) {
      fieldsToExclude = [];
    }

    if (!fieldMap) {
      fieldMap = [];
    }

    if (!rows || !rows.length) {
      return [];
    }

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowFields = Object.keys(row);

      for (let j = 0; j < rowFields.length; j++) {
        const rowFieldName = rowFields[j];
        let exists = false;

        for (let k = 0; k < fields.length; k++) {
          const field = fields[k];

          if (field.name === rowFieldName) {
            exists = true;
            break;
          }
        }

        if (!exists) {
          const label = rowFieldName.replace(new RegExp('_', 'g'), ' ').trim();
          fields.push({
            name: rowFieldName,
            label
          });
        }
      }
    }

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]; // Field exclusion

      if (fieldsToExclude.indexOf(field.name) !== -1) {
        fields.splice(i, 1);
        i--;
        continue;
      } // Field mapping


      if (fieldMap.hasOwnProperty(field.name)) {
        fields[i].label = fieldMap[field.name];
      }
    }

    return fields;
  }

  render() {
    const fields = this.getFields();
    const rows = this.props.rows;

    if (this.props.errorMessage) {
      return this.renderErrorTable();
    }

    if (this.props.loadingMessage) {
      return this.renderLoadingTable();
    }

    if (!rows || !rows.length) {
      return this.renderEmptyTable();
    }

    return React.createElement("div", null, React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: "table table-striped"
    }, React.createElement("thead", null, React.createElement("tr", null, this.renderCheckboxCell('all'), fields.map(field => this.renderHeader(field)), this.renderActionsCell())), React.createElement("tbody", null, rows.map(row => this.renderRow(row))))), this.renderPagination());
  }

  renderRow(row) {
    return React.createElement(DataRow, {
      row: row,
      buttons: this.props.buttons,
      fields: this.getFields(),
      checkboxIsChecked: value => this.checkboxIsChecked(value),
      checkboxChange: e => this.checkboxChange(e),
      dataItemManipulator: (field, value) => this.props.dataItemManipulator(field, value)
    });
  }

  renderHeader(field) {
    const props = this.props;
    let orderByIcon = '';

    if (props.orderByField === field.name) {
      orderByIcon = props.orderByDirection === 'asc' ? '↓' : '↑';
    }

    return React.createElement("th", {
      style: {
        cursor: props.changeOrder ? 'pointer' : 'default'
      },
      key: field.name,
      onClick: () => this.changeOrder(field)
    }, field.label, "\xA0", orderByIcon);
  }

  renderActionsCell() {
    const props = this.props;
    const state = this.state;

    if (!props.renderCheckboxes || !this.props.actions.length) {
      return;
    }

    return React.createElement("th", null, React.createElement("div", {
      className: "dropdown"
    }, React.createElement("button", {
      className: "btn btn-secondary dropdown-toggle",
      type: "button",
      id: "dropdownMenuButton",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      disabled: !state.checkedRowIds.length
    }, "Actions"), React.createElement("div", {
      className: "dropdown-menu",
      "aria-labelledby": "dropdownMenuButton"
    }, this.props.actions.map(action => this.renderActionButton(action)))));
  }

  renderActionButton(action) {
    return React.createElement("button", {
      key: `action_${action.name}`,
      type: "button",
      className: "dropdown-item",
      onClick: () => {
        action.callback(this.state.checkedRowIds);
        this.setState({
          checkedRowIds: []
        });
      }
    }, action.name);
  }

  changeOrder(field) {
    const props = this.props;
    let newOrderByDirection = 'asc';

    if (!props.changeOrder) {
      return;
    }

    if (props.orderByField === field.name) {
      newOrderByDirection = props.orderByDirection === 'asc' ? 'desc' : 'asc';
    }

    props.changeOrder(field.name, newOrderByDirection);
  }

  renderCheckboxCell(value) {
    if (!this.props.renderCheckboxes) {
      return;
    }

    const checkbox = React.createElement("div", {
      className: "form-check"
    }, React.createElement("input", {
      type: "checkbox",
      value: value,
      checked: this.checkboxIsChecked(value),
      onChange: e => this.checkboxChange(e)
    }));

    if (value === 'all') {
      return React.createElement("th", null, checkbox);
    }

    return React.createElement("td", null, checkbox);
  }

  checkboxIsChecked(value) {
    if (value === 'all') {
      return this.state.checkedRowIds.length === this.props.rows.length;
    }

    return this.state.checkedRowIds.indexOf(value) !== -1;
  }

  checkboxChange(e) {
    const target = e.target;
    const props = this.props;
    const rows = props.rows;

    if (target.value === 'all') {
      if (target.checked) {
        const ids = [];

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          ids.push(row.id);
        }

        this.setState({
          checkedRowIds: ids
        });
      } else {
        this.setState({
          checkedRowIds: []
        });
      }

      return;
    }

    const checkedRowIds = this.state.checkedRowIds;
    const rowId = parseInt(target.value);

    if (target.checked) {
      if (checkedRowIds.indexOf(rowId) === -1) {
        checkedRowIds.push(rowId);
      }
    } else {
      const index = checkedRowIds.indexOf(rowId);

      if (index !== -1) {
        checkedRowIds.splice(index, 1);
      }
    }

    this.setState({
      checkedRowIds
    });
  }

  renderLoadingTable() {
    return React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: "table table-striped"
    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
      className: "text-center"
    }, React.createElement("div", {
      className: "mt-5"
    }, this.props.loadingIndicator ? this.props.loadingIndicator : null), React.createElement("div", {
      className: "mt-5"
    }, this.props.loadingMessage))))));
  }

  renderErrorTable() {
    return React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: "table table-striped"
    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
      className: "text-center"
    }, this.props.errorMessage)))));
  }

  renderEmptyTable() {
    let noDataMessage = 'No data.';

    if (this.props.noDataMessage) {
      noDataMessage = this.props.noDataMessage;
    }

    return React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: "table table-striped"
    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
      className: "text-center"
    }, noDataMessage)))));
  }

  renderPagination() {
    const props = this.props;
    return React.createElement(Pagination, {
      currentPage: props.currentPage,
      totalPages: props.totalPages,
      changePage: page => props.changePage(page)
    });
  }

}

DynamicDataTable.propTypes = {
  rows: PropTypes.array,
  fieldsToExclude: PropTypes.array,
  fieldMap: PropTypes.object,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  orderByField: PropTypes.string,
  orderByDirection: PropTypes.oneOf(['asc', 'desc']),
  renderCheckboxes: PropTypes.bool,
  actions: PropTypes.array,
  loadingMessage: PropTypes.string,
  loadingComponent: PropTypes.object,
  errorMessage: PropTypes.string,
  noDataMessage: PropTypes.string,
  dataItemManipulator: PropTypes.func,
  buttons: PropTypes.array
};
DynamicDataTable.defaultProps = {
  rows: [],
  fieldsToExclude: [],
  fieldMap: {},
  currentPage: 1,
  totalPages: 1,
  orderByField: null,
  orderByDirection: 'asc',
  renderCheckboxes: false,
  actions: [],
  loadingMessage: '',
  loadingComponent: null,
  errorMessage: '',
  noDataMessage: '',
  dataItemManipulator: (field, value) => {
    return value;
  },
  buttons: [{
    name: 'View',
    callback: row => {
      window.location = `${location.href}/${row.id}`;
    }
  }]
};
export default DynamicDataTable;