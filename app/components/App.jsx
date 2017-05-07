import React from 'react'
import {Link} from 'react-router-dom'

export default (props)=>(
  <div>
    <Link to='/dashboard'>Dashboard</Link>
    <span>   </span>
    <Link to='/explorer'>Explorer</Link>
    <span>   </span>
    <Link to='/home'>Home</Link>
    {props.children}
  </div>)
