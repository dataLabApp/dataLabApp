import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NavTop from './Navbar'
import InvisibleLoader from './InvisibleLoader'

export default(props)=>(
      <div>
        <NavTop />
        {props.children}
        <InvisibleLoader />
      </div>)


