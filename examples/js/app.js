
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, hashHistory } from 'react-router';

import App from './components/App';

import PageNotFound from './components/PageNotFound';

import Complex from './complex/demo';
import LimitedSets from './limited-sets/LimitedSets';
import JqTable from './client-api/JqTable';


const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={ hashHistory }>
        <Route path='/' component={ App }>
        <Route path='admin'>
					<Route path='error-codes' component={ Complex } />
					<Route path='limited-sets' component={ LimitedSets } />
          <Route path='client-api' component={ JqTable } />
				</Route>
          <Route path='*' component={ PageNotFound }/>
        </Route>
      </Router>
    </AppContainer>, document.querySelector('#root'));
};

if (module.hot) {
  module.hot.accept('./app', renderApp);
}

renderApp();
