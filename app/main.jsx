
'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, HashRouter, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import TalkToDatabase from './components/TalkToDatabase.jsx'
import store from './store.jsx'
import App from './components/App.jsx'
import HomeView from './components/HomeView.jsx'
import Chart from './components/Chart.jsx'

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
  ,
 document.getElementById('main')
)


  // <Provider store={store}>
  //   <HashRouter>
  //     <Route path="/" component={App} >
  //      <Route path="/home" component={HomeView} />
  //      <IndexRedirect to="/home" />
  //    </Route>
  //   </HashRouter>
  // </Provider>
