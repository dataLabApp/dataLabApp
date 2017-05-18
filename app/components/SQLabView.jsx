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


export default function SQLabView () {
  return (
    <div className="container">
      <PageHeader header="Welcome to SQLab" />
      {
      // <p>SQLab is where you can connect to your database, search your tables, and create slices. Once you find the perfect slice to visualize, click "Save".</p>
      }
      <TalkToDatabase />
    </div>
    );
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
