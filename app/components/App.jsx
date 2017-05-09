import React from 'react'
import {Link} from 'react-router-dom'
import BubbleChart from './BubbleChart'

export default (props)=>(
  <div>
  <BubbleChart />
    <Link to='/dashboard'>Dashboard</Link>
    <span>   </span>
    <Link to='/explorer'>Explorer</Link>
    <span>   </span>
    <Link to='/home'>Home</Link>
import NavTop from './Navbar'

export default (props)=>(
  <div>
    <NavTop />
    {props.children}
  </div>)
