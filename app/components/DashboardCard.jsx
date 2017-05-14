import React, {Component} from 'react'
var ReactFauxDOM = require('react-faux-dom')
import {ROOT_PATH} from '../constants'
import {barChartGenerator} from '../utils/chartGenerators.js'
var d3_save_svg = require('d3-save-svg');
var d3 = require('d3')


export default class DashboardCard extends Component{
  constructor(props){
    super(props)
    console.log("props are...", props)
  }
  componentDidMount(){
  }

  exportAsSVG() {
    d3_save_svg.save(d3.select('svg').node(), config);
  };
  
  render(){
    console.log("props in DashboardCard are ", this.props)
    let title = this.props.card.title || 'Delightful Chart Example'
    let userCode = this.props.userCode || undefined
    let chart = this.props.card.chart || barChartGenerator
    console.log("Chart is ", chart)
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
        <div className="x_content">
            {chart()}
        </div>
          <button onClick={this.exportAsSVG}>Export as SVG</button>
      </div>
  )
  }
}
