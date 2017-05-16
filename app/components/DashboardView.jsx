import React, {Component} from 'react'
import PageHeader from './PageHeader'
import DragAndDrop from './DragAndDrop'
import {Panel} from 'react-bootstrap'
import {connect} from 'react-redux'
import {setCurrentDashboard} from '../reducers/dashboardReducer'
var PrintTemplate = require('react-print')

// export default class DashboardView extends Component {
const DashboardView = (props) => {
  console.log('~~props in DashboardView ', props.dashBoards)
  console.log('~~props id in DashboardView ', props.dashBoards.currentDashboard.id)
  const print = () => (
  window.print()
)

  return (
    <div className = "container">
        <button onClick={print} className="pull-right" id="react-no-print"><span className="glyphicon glyphicon-download"></span></button>
        <ul style={{listStyle: 'none'}}>
          <h3>Choose Dashboard</h3>
          { props.dashBoards.dashboards.map(db => (
            <li key={db.id} ><a onClick= { () => props.setCurrentDashboard(db.id)}>{db.title}</a> </li>
        )) }
        </ul>
        <PageHeader header="Dashboard"/>
            <div className="container">
                <DragAndDrop />
            </div>
    </div>
  )
}
const mapStateToProps = (state) => (
  {
    dashBoards: state.dashboards
  }
)
const mapDispatchToProps = (dispatch) => ({
  setCurrentDashboard: (dbId) => {
    dispatch(setCurrentDashboard(dbId))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)
