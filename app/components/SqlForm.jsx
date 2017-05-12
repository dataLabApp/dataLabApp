import React from 'react'
import { connect } from 'react-redux'
import { form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap'

const SQLForm = props => {
  return (
    <div>
      <p />
        <form onSubmit={props.handleQuery}>
          <FormGroup controlId="formsControlTextarea">
            <ControlLabel>Enter SQL Query: </ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter SQL Query here: " value={props.currentSQLQuery}
              onChange={props.handleChange} />
          </FormGroup>
          <Button bsStyle="primary" type='submit'>
            Submit Query
          </Button>
        </form>
    </div>
  )
}

// ------------- Container
const mapStateToProps = null
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(SQLForm)
