import React, {Component} from 'react'
var ReactFauxDOM = require('react-faux-dom')
import {ROOT_PATH} from '../constants'

const AllCard = (props) => {
  let title = props.title || 'Delightful Chart Example'
  let chart = props.chart
  return(
    <div className="x_panel tile fixed_height_320">
      <div className="x_title">
        <h2>{title}</h2>
        <ul className="nav navbar-right panel_toolbox">
          <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="#">Settings 1</a>
              </li>
              <li><a href="#">Settings 2</a>
              </li>
            </ul>
          </li>
          <li><a className="close-link"><i className="fa fa-close"></i></a>
          </li>
        </ul>
        <div className="clearfix"></div>
      </div>
      <div className="x_content" style={{height:150,width:300}}>
        <div>
          {chart}
        </div>
      </div>
    </div>
  )
}
export default AllCard