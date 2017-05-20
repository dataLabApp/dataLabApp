import React, {Component} from 'react'
var ReactFauxDOM = require('react-faux-dom')
import {ROOT_PATH} from '../constants'
import {createHook} from '../utils/createHook.js'
var d3SaveSvg = require('d3-save-svg')
var d3 = require('d3')
import {connect} from 'react-redux'
import {updateDashboardLayout, deleteCardFromDashboard} from '../reducers/dashboardReducer'

class DashboardCard extends Component {
  constructor(props) {
    super(props)
    this.title= props.card.title
  }

  render() {
    const exportAsSVG = () => {
      var config = {
        filename: this.title
      }
      d3SaveSvg.save(d3.select('svg').node(), config)
    }

    const title = this.props.card.title || 'Delightful Chart Example'
    const chartGenerator = this.props.card.chartGenerator
    const chart = this.props.card.chart
    const config = this.props.card.config
    const data = this.props.data
    const cardId = this.props.card.id
    const dashId = this.props.currentDashboard.id
    return (
      <div className="x_panel tile fixed_height_320">
        <div className="x_title">
          <h5>{title}</h5>
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
            <li onClick={() => this.props.deleteCard(dashId, cardId)}><a className="close-link"><i className="fa fa-close"></i></a>
            </li>
          </ul>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
            {chartGenerator ? chartGenerator(data, config).toReact() : chart()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: state.data.allSlices.filter(slice => +slice.id === +ownProps.card.sliceId)[0].data,
  currentDashboard: state.dashboards.currentDashboard
})

const mapDispatchToProps = (dispatch) => ({
  deleteCard: (dashId, cardId) => dispatch(deleteCardFromDashboard(dashId, cardId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCard)
