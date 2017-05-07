import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

export default (props)=>(
  <div>
<<<<<<< HEAD
    <Header />
=======
    <Link to='/home'>Home</Link>
    {props.children}
    <span>   </span>
>>>>>>> master
    <Link to='/dashboard'>Dashboard</Link>
    <span>   </span>
    <Link to='/talktodb'>Talk To Database</Link>
    <span>   </span>
    <Link to='/explorer'>Explorer</Link>
    <span>   </span>
  </div>)
