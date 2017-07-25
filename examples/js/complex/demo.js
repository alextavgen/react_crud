require('./demo.css');
import React from 'react';
import App from './app';

class Demo extends React.Component {
  render() {
    return (
      <div className='col-md-offset-1 col-md-8'>
        <div className='panel panel-default'>
          <div className='panel-heading'>Error Codes for Galaxy API</div>
          <h5>Source in GIT_REPO_PATH</h5>
          <div className='panel-body'>
            <App />
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
