import React, { Component } from 'react'
import { connect } from 'react-redux'
import { form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap'

const Login = props => {
  return (
    <form onSubmit={event => {
      event.preventDefault()
      login(event.target.username.value, event.target.password.value)
    }}>
      <input name="username" />
      <input name="password" type="password" />
      <input type="submit" value="Login" />
    </form>
  )
}



// ------------- Container
const mapStateToProps = null
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Login)
