/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

let objRef;
let arr;
const REST_POINT = 'http://localhost:8080/limited_set/licensees';
// const ELEMENTS = [ 'Coral', 'LadBrokes', 'WAF' ];

function onRowSelect(row, isSelected) {
  console.log(row);
  console.log(`selected: ${isSelected}`);
}

function onSelectAll(isSelected) {
  console.log(`is select all: ${isSelected}`);
}

function onAfterSaveCell(row, cellName, cellValue) {
  console.log('After save row', cellName, cellValue, row);
}

function onAfterTableComplete() {
  console.log('Table render complete.');
}

function onAfterDeleteRow(rowKeys) {
  console.log('Keys', rowKeys);
  arr = objRef.state.tableData;
  const filtered = arr.filter(function(x) { return rowKeys.indexOf(x.id) < 0; });
  objRef.setState({ tableData: filtered });
  console.log('After delete row', filtered);
}

function onAfterInsertRow(row) {
  console.log('TAfter insert row.', row, objRef.state.tableData);
  arr = objRef.state.tableData;
  arr.push( row );
  objRef.setState({ tableData: arr });
}

function handleClick() {
  if (objRef.state.btnTitle === 'Licensee' || objRef.state.reviewTitle === 'Review Date') {
    alert('You should specify Licensee and Review Date');
    return;
  }
  const upReview = {
    licensee: objRef.state.btnTitle,
    set: objRef.state.tableData
  };
  console.log(upReview);
  fetch(REST_POINT + '/' + objRef.state.btnTitle, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(upReview)
  });

  fetch(REST_POINT + '/' + objRef.state.btnTitle)
      .then(result => result.json())
      .then(params => {
        objRef.setState({ reviewData: params });
        objRef.setState({ reviewTitle: 'Review Date' });
      });
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
  sortName: 'service',  // default sort column name
  sortOrder: 'asc',  // default sort order
  afterTableComplete: onAfterTableComplete, // A hook for after table render complete.
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};

function renderMenuItem(title) {
  return (
    <MenuItem eventKey={ title }>{ title }</MenuItem>
  );
}

function nameValidator(value) {
  if (!value) {
    return 'Name is required!';
  } else if (value.length < 3) {
    return 'Name length must great 3 char';
  }
  return true;
}

function trClassNameFormat(rowData, rIndex) {
  return rIndex % 2 === 0 ? 'second-tr' : '';
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnTitle: 'Licensee',
      reviewTitle: 'Review Date',
      reviewData: [],
      data: [],
      tableData: []
    };
    objRef = this;
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectReview = this.handleSelectReview.bind(this);
  }
  componentDidMount() {
    fetch(REST_POINT)
        .then(result => result.json())
        .then(params => {
          console.log('Before Mount');
          this.setState({ data: params });
        });
    // this.forceUpdate();
  }

  handleSelect(evt) {
    this.setState({ btnTitle: evt });
    this.setState({ tableData: [] });
    fetch(REST_POINT + '/' + evt)
        .then(result => result.json())
        .then(params => {
          this.setState({ reviewData: params });
          this.setState({ reviewTitle: 'Review Date' });
        });
  }

  handleSelectReview(evt) {
    this.setState({ reviewTitle: evt });
    fetch(REST_POINT + '/' + this.state.btnTitle + '/' + encodeURIComponent(evt))
        .then(result => result.json())
        .then(params => {
          console.log('Table data', params);
          this.setState({ tableData: params.set });
        });
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <DropdownButton bsStyle='default' title={ this.state.btnTitle } onSelect={ this.handleSelect } key='0' id={ `dropdown-basic-${ '0' }` }>
            { this.state.data.map(renderMenuItem) }
          </DropdownButton>
          <DropdownButton bsStyle='default' title={ this.state.reviewTitle } onSelect={ this.handleSelectReview } key='1' id={ `dropdown-basic-${ '1' }` }>
            { this.state.reviewData.map(renderMenuItem) }
          </DropdownButton>
        </ButtonToolbar>
        <div className='panel-body'>
          <BootstrapTable data={ this.state.tableData }
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
            <TableHeaderColumn dataField='id' dataAlign='center' dataSort isKey autoValue={ true } hidden={ true }>Id</TableHeaderColumn>
            <TableHeaderColumn dataField='service' className='good' dataSort
              editable={ { type: 'textarea', validator: nameValidator } }>Service</TableHeaderColumn>
            <TableHeaderColumn dataField='operation' dataSort
              editable={ { type: 'textarea', validator: nameValidator } }>Operation</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ButtonToolbar>
         <Button bsStyle='primary' onClick={ handleClick }>Save New Review</Button>
       </ButtonToolbar>
       </div>
    );
  }

}
