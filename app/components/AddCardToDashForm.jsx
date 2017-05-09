import React from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

let AddCardToDashForm = (props) => (
  <form>
    <FormGroup>
      <Button onClick={props.handleSubmit}>
        Add Cart
      </Button>
    </FormGroup>
  </form>
)

let mapStateToProps = (state)=>(
  {
    availableDashboards: state.dashboards.dashboards,
    currentDashboard: state.dashboards.currentDashboard
  }
)

let mapDispatchToProps = (dispatch)=>(
  {

  }
)

export default connect(mapStateToProps,mapDispatchToProps)(AddCardToDashForm)
