import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

export default (props)=>(
  <div>
    <Header />
    {props.children}
  </div>)