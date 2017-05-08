import React from 'react'
import {Link} from 'react-router-dom'
import NavTop from './Navbar'

export default (props)=>(
  <div>
    <NavTop />
    {props.children}
  </div>)