/* eslint max-len: 0 */
import React from 'react';
import 'toastr/build/toastr.min.css';
import '../../../css/react-bootstrap-table.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const examples = [ {
      text: 'Error Codes',
      href: 'error-codes'
    }, {
      text: 'Limited Sets',
      href: 'limited-sets'
    }, {
      text: 'ClientAPI Entities',
      href: 'client-api'
    } ];

    const exampleMenuItems = examples.map((item) => {
      return (
        <li key={ item.href }>
          <a href={ `#/admin/${item.href}` }>{ item.text }</a>
        </li>
      );
    });
    return (
      <div>
        <nav className='navbar navbar-inverse'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href='#'>Admin Page for Configurations</a>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li>
                  <a href='#/getting-started'>Getting Started</a>
                </li>
                <li>
                  <a href='#'>Git Repository</a>
                </li>
                <li className='dropdown'>
                  <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Configurations <span className='caret'></span></a>
                  <ul className='dropdown-menu'>
                    { exampleMenuItems }
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Grid fluid>
          <Row>
            <Col md={ 12 }>
              { this.props.children }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
