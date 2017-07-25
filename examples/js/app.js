
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, hashHistory } from 'react-router';

import App from './components/App';
// import Home from './components/Home';
// import GettingStarted from './components/GettingStarted';
import PageNotFound from './components/PageNotFound';
// import Basic from './basic/demo';
// import Column from './column/demo';
// import Sort from './sort/demo';
// import ColumnFormat from './column-format/demo';
// /import ColumnFilter from './column-filter/demo';
// import Selection from './selection/demo';
// import Pagination from './pagination/demo';
// import Manipulation from './manipulation/demo';
// import CellEdit from './cell-edit/demo';
// import Style from './style/demo';
// import Advance from './advance/demo';
// import Other from './others/demo';
import Complex from './complex/demo';
import LimitedSets from './limited-sets/LimitedSets';
// import Expand from './expandRow/demo';
// import Custom from './custom/demo';
// import Span from './column-header-span/demo';
// import KeyBoardNav from './keyboard-nav/demo';

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={ hashHistory }>
        <Route path='/' component={ App }>
        <Route path='admin'>
					<Route path='error-codes' component={ Complex } />
					<Route path='limited-sets' component={ LimitedSets } />
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
