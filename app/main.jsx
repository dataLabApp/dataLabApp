'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import App from './components/App'
import HomeView from './components/HomeView'

render(
 <Provider store={store}>
   <Router history={browserHistory}>
     <Route path="/" component={App} >
       <Route path="/home" component={HomeView} />
     <IndexRedirect to="/home" />
    </Route>
  </Router>
 </Provider>,
 document.getElementById('main')
)
