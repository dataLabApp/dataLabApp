import React, {Component} from 'react'
import PageHeader from './PageHeader'
import DragAndDrop from './DragAndDrop'
import {connect} from 'react-redux'
import {setCurrentDashboard} from '../reducers/dashboardReducer'
var PrintTemplate = require('react-print')
import {Form, FormGroup, Button, ControlLabel, FormControl, ListGroup, ListGroupItem, Tabs, Tab} from 'react-bootstrap'

// export default class DashboardView extends Component {
const DashboardView = (props) => {
  const print = () => (
  window.print()
)
  let tabNum = props.dashBoards.dashboards[0].id
  return (
    <div className = "container-fluid">
      <Tabs defaultActiveKey={tabNum} id="dashboards" pullLeft justified onSelect={props.setCurrentDashboard}>
      { props.dashBoards.dashboards.map((db,i) => { 
            return (<Tab eventKey={db.id} title={db.title}></Tab>)
      })
      }
      </Tabs>
      <br/><br/><br/>
    
      <DragAndDrop />

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
  setCurrentDashboard: (dbId) => {
    dispatch(setCurrentDashboard(dbId))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)


    // <button onClick={print} className="pull-right" id="react-no-print"><span className="glyphicon glyphicon-download"></span></button>
    //     <ul style={{listStyle: 'none'}}>
    //       <h3>Choose Dashboard</h3>
    //       { props.dashBoards.dashboards.map(db => (
    //         <li key={db.id} ><a onClick= { () => props.setCurrentDashboard(db.id)}>{db.title}</a> </li>
    //     )) }
    //     </ul>