import React, {Component} from 'react'
var ReactFauxDOM = require('react-faux-dom')
import {ROOT_PATH} from '../constants'
var d3SaveSvg = require('d3-save-svg')
var d3 = require('d3')
import {connect} from 'react-redux'
import {updateDashboardLayout, deleteCardFromDashboard} from '../reducers/dashboardReducer'

window.createHook = (comp, elem, statename) => {
  let elems = new Map(),
    interval
  const updateState = () => {
    comp.setState({[statename]: elem.toReact()})
  }
  setTimeout(updateState)
  comp.isAnimating = () => !!interval
  return (transition) => {
    transition.each((e) => {
      elems.set(e, (elems.get(e) || new Set()).add(transition.id))
      interval = interval || setInterval(updateState, 16)
    })
    transition.each('end', (e) => {
      const anims = elems.get(e)
      anims.delete(transition.id)
      if (anims.size) {
        elems.set(e, anims)
      } else {
        elems.delete(e)
      }
      if (!elems.size) interval = clearInterval(interval)
    })
  }
}

class DashboardCard extends Component {
  constructor(props) {
    super(props)
    this.title= props.card.title
    this.state= {
      chartNode: props.card.chartGenerator(props.data, props.card.config)
    }
  }

  componentWillMount() {
    this.setState({hook: window.createHook(this, this.state.chartNode, 'chart')})
  }

  componentWillReceiveProps(newProps) {
    this.state.chartNode.update(newProps.data, this.state.hook)
  }

  componentDidMount() {

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
        <div style={{float: 'float-left'}} className="x_title">
          <h5>{title}</h5>
          <ul style={{float: 'float-right'}} className="nav navbar-right panel_toolbox">
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
            {this.state.chart || this.state.chartNode.toReact()}
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
