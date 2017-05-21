import React, {Component} from 'react'
var ReactFauxDOM = require('react-faux-dom')
import {ROOT_PATH} from '../constants'
import {FormGroup, Form, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {chartGenerator, storeChartGenerator, IIFChartGenerator} from '../utils/chartGenerators'
const d3 = require('d3')
const d3SaveSvg = require('d3-save-svg')

export default class ExplorerChart extends Component {
  constructor(props){
    super(props)
    this.state = {showTitleForm: false}
  }
  render() {
    const exportAsSVG = () => {
      var config = {
        filename: title
      }
      d3SaveSvg.save(d3.select('svg').node(), config)
    }
    const title = this.props.cardTitle
    const userCode = this.props.userCode
    const chartGenerator = IIFChartGenerator(userCode)
    const data = this.props.config.data
    const config = this.props.config
    return (
      <div className="x_panel tile">
        <div className="x_title" onClick={() => this.setState({showTitleForm: true})}>
          <h4>{this.state.showTitleForm
            ? <Form inline onSubmit={() => this.setState({showTitleForm: false})}>
               <FormControl bsSize="large" type="text" value={title} onChange={(e) => this.props.updateCardTitle(e.target.value)}>
               </FormControl>
            </Form>
            : title}</h4>
          <ul className="nav navbar-right panel_toolbox">
            <li><a onClick={exportAsSVG} className="collapse-link"><i className="fa fa-file-code-o"></i></a></li>
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
        <div className="x_content" >
            {chartGenerator(data, config).toReact()}
        </div>
      </div>
    )
  }
}
// style={{height: 700, width: 800}}
