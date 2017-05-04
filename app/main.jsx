import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import TalkToDatabase from './components/TalkToDatabase.jsx'
import store from './store.jsx'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={TalkToDatabase} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
