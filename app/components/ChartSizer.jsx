import React, {Component} from 'react'
import {FormGroup, Form, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

export default props => {
  const inputStyle = {
    width: 55,
    margin: 7,
  }

  return (
    <Form inline>
      <FormGroup>
        <ControlLabel>{'Width  '}</ControlLabel>
        <FormControl style={ inputStyle } type="text" value={props.currentWidth} onChange={(e) => props.changeDimension({fullWidth: e.target.value})}>
        </FormControl>
        {'   '}
        <ControlLabel>{'Height  '}</ControlLabel>
        <FormControl style={ inputStyle } type="text" value={props.currentHeight} onChange={(e) => props.changeDimension({fullHeight: e.target.value})}>
        </FormControl>
      </FormGroup>
    </Form>
  )
}
