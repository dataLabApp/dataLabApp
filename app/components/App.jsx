import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

export default (props)=>(
  <div>
    <Header />
    <Link to='/dashboard'>Dashboard</Link>
    <span>   </span>
    <Link to='/explorer'>Explorer</Link>
    <span>   </span>
    <Link to='/home'>Home</Link>
    {props.children}
  </div>)
