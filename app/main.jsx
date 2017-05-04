
'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, HashRouter, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import TalkToDatabase from './components/TalkToDatabase.jsx'

import store from './store.jsx'
import App from './components/App.jsx'
import HomeView from './components/HomeView.jsx'

render(
 <Provider store={store}>
   <HashRouter>
     <Route path="/" component={TalkToDatabase} >
       <Route path="/home" component={HomeView} />
     <IndexRedirect to="/home" />
    </Route>
  </HashRouter>
 </Provider>,
 document.getElementById('main')
)
