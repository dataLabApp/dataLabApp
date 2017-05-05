
'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, HashRouter, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import TalkToDatabase from './components/TalkToDatabase.jsx'
import store from './store.jsx'
import App from './components/App.jsx'
import HomeView from './components/HomeView.jsx'
import BarChart from './components/BarChart.jsx'
import Dashboard from './components/Dashboard.jsx'

render(
  <div>
    <Provider store={store}>
      <BarChart />
    </Provider>
    <Provider store={store}>
      <Dashboard />
    </Provider>
    <App />
    <HomeView />
    <TalkToDatabase />
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
