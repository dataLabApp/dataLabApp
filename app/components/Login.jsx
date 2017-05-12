import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap'

const Login = props => {
  return (
    <Form onSubmit={event => {
      event.preventDefault()
      login(event.target.username.value, event.target.password.value)
    }}>
    <FormGroup>
      <ControlLabel>Login</ControlLabel>
      <FormControl
      id="userName"
      type="text"
      value=""
      />
    </FormGroup>
    <Button bstyle="primary" type="submit">Login</Button>
      {/*<input name="username" />
      <input name="password" type="password" />
      <input type="submit" value="Login" />*/}
    </Form>
  )
}



// ------------- Container
const mapStateToProps = null
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Login)
