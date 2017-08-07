/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
/* eslint space-infix-ops: 0 */
/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const REST_POINT = 'http://localhost:8080/error_code';
const REST_POINT_POST = 'http://localhost:8080/error_code';
let objRef;
function populateTable() {
  fetch(REST_POINT)
        .then(result => result.json())
        .then(params => {
          console.log(params);
          objRef.setState({ data: params });
        });
}

function onRowSelect(row, isSelected) {
  console.log(row);
  console.log(`selected: ${isSelected}`);
}

function onSelectAll(isSelected) {
  console.log(`is select all: ${isSelected}`);
}

function onAfterSaveCell(row, cellName, cellValue) {
  fetch(REST_POINT_POST, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(row)
  })
  .then(result => result.json())
  .then(result => console.log(result))
  .catch((err) => console.log('error', err));
  console.log(`Save cell ${cellName} with value ${cellValue}`);
  console.log('The whole row :');
  console.log(row);
  // populateTable();
}

function onAfterTableComplete() {
  console.log('Table render complete.');
}

function onAfterDeleteRow(rowKeys) {
  fetch(REST_POINT_POST + '/' + rowKeys, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
  .then(result => result.json())
  .then(result => console.log(result))
  .catch((err) => console.log('error', err));
  console.log('onAfterDeleteRow');
  console.log(rowKeys);
  // populateTable();
}

function onAfterInsertRow(row) {
  console.log('onAfterInsertRow');
  console.log(row);
  fetch(REST_POINT_POST, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(row)
  })
  .then(result => result.json())
  .then(result => console.log(result))
  .catch((err) => console.log('error', err));
  // populateTable();
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  selected: [], // default select on table
  bgColor: 'rgb(238, 193, 213)',
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

const options = {
  paginationShowsTotal: true,
  sortName: 'id',  // default sort column name
  sortOrder: 'asc',  // default sort order
  afterTableComplete: onAfterTableComplete, // A hook for after table render complete.
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
  sizePerPage: 30
};


function errorCodeFormatter(cell, row) {
  return '<font color="red">' + cell + '</font>';
}

function trClassNameFormat(rowData, rIndex) {
  return rIndex % 2 === 0 ? 'second-tr' : '';
}
function nameValidator(value) {
  if (!value) {
    return 'Error Code required.';
  } else if (value.length < 3) {
    return 'Error Code length must great 3 char';
  }
  return true;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    objRef = this;
    populateTable();
  }


  render() {
    return (
      <BootstrapTable data={ this.state.data }
        trClassName={ trClassNameFormat }
        selectRow={ selectRowProp }
        cellEdit={ cellEditProp }
        options={ options }
        insertRow
        deleteRow
        search
        columnFilter
        hover
        pagination>
        <TableHeaderColumn dataField='id' width='5%' dataAlign='center' dataSort={ true } isKey>Error ID</TableHeaderColumn>
        <TableHeaderColumn dataField='code' dataFormat={ errorCodeFormatter } className='good' dataSort
          editable={ { type: 'textarea', validator: nameValidator } }>Error Code</TableHeaderColumn>
				<TableHeaderColumn dataField='descr' dataSort
          editable={ { type: 'textarea', validator: nameValidator } }>Description</TableHeaderColumn>
          <TableHeaderColumn dataField='group' dataSort
          editable={ { type: 'textarea', validator: nameValidator } }>Group</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
