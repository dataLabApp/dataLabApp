import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from './Chart'
import BubbleChart from './BubbleChart'

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state= {dashboards: props.dashboards}
  }

  render() {
    return (
      <div className="container-fluid">
         <div className="row">
            <div className="container" style={{'height': 'auto', 'width': '100%'}}>
                <div className="col-sm-4">
                  <Chart />
                </div>
                <div className="col-sm-4">
                  <Chart />
                </div>
                <div className="col-sm-4">
                  <Chart />
                </div>
                <div className="col-sm-4 col-md-6 col-lg-6">
                  <BubbleChart />
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <Chart />
                </div>
          </div>
        </div>
       </div>
    )
  }
}

// ----------------------- Container -----------------------

const mapStateToProps = (state, ownProps) => ({
  dashboards: state.dashboards.dashboards
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
