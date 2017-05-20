import React, {Component} from 'react'
import PageHeader from './PageHeader'
import DragAndDrop from './DragAndDrop'
import {connect} from 'react-redux'
import {setCurrentDashboard} from '../reducers/dashboardReducer'
var PrintTemplate = require('react-print')
import {Form, FormGroup, Button, ControlLabel, FormControl, ListGroup, ListGroupItem} from 'react-bootstrap'

// export default class DashboardView extends Component {
const DashboardView = (props) => {
  const print = () => (
  window.print()
)

  return (
    <div className = "container-fluid">
        <button onClick={print} className="pull-right" id="react-no-print"><span className="glyphicon glyphicon-download"></span></button>
        <div className="row">
        <div className="col-sm-3">

        <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select a Dashboard</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange= {props.setCurrentDashboard}>
              {
              props.dashBoards.dashboards.map((db)=>{
                return <option key = {db.id} value={db.id}>{db.title}</option>
              })
              }
              </FormControl>
            </FormGroup>
        </div>
        <div className="col-sm-9">
                <DragAndDrop />
        </div>
    </div>
  </div>
  )
}

// ----------------------- Container -----------------------
const mapStateToProps = (state) => (
  {
    dashBoards: state.dashboards,
    currentDashboardCards: state.dashboards.currentDashboard.cards
  }
)
const mapDispatchToProps = (dispatch) => ({
  setCurrentDashboard: (event) => {
    event.preventDefault()
    let dbId = event.target.value
    dispatch(setCurrentDashboard(dbId))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)
