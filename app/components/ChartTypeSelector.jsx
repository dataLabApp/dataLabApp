import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

export default props => {
  const options = Object.keys(props.options)
  return (
    <form>
      <FormGroup>
        <ControlLabel>Chart Type</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={props.setChartType}>
          <option key='0' value={props.currentChartType}>{props.currentChartType}</option>
          {options.map((column, index) => {
            if (column!==props.currentChartType) {
              return (
              <option key={''+(index+1)} value={column}>{column}</option>
              )
            }
          })}
        </FormControl>
      </FormGroup>
    </form>
  )
}
