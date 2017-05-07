import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

export default (props)=>(
  <div>
    <Header />
    <Link to='/dashboard'>Dashboard</Link>
    <Link to='/talktodb'>Talk To Database</Link>
    <Link to='/explorer'>Explorer</Link>
    <Link to='/home'>Home</Link>
    {props.children}
  </div>)