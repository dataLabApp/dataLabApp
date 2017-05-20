import React, { Component } from 'react';
import {Form, FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap'
import { connect } from 'react-redux'
import SQLForm from './SQLForm'
import PageHeader from './PageHeader'
// import { Link } from 'react-router-dom';
import styles from '../../assets/css/TalkToDatabase.css';
import BarChart from './BarChart'
import TalkToDatabase from './TalkToDatabase'

const pg = require('pg')


export default function SQLabView() {
  return (
    <div className="container-fluid">
      <TalkToDatabase />
    </div>
  )
}


// ----------------------- Container -----------------------
// import { setCurrentData } from '../reducers/dataReducer.jsx'

// const mapStateToProps = (state, ownProps) => (
//   {
//     currentData: state.data.currentData
//   }
// )
// //should we use the object formatting here? KH
// const mapDispatchToProps = dispatch => ({
//   setCurrentData: data => dispatch(setCurrentData(data))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(SQLabView)
