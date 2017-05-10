import React, { Component } from 'react';
import {Form, FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap'
import { connect } from 'react-redux'
import SQLForm from './SQLForm'
import PageHeader from './PageHeader'
// import { Link } from 'react-router-dom';
import styles from '../../assets/css/TalkToDatabase.css';
import BarChart from './BarChart'

const pg = require('pg')


class TalkToDatabase extends Component {
  constructor (props) {
    super (props)
    this.state = {
      currentDatabaseName: '',
      currentTableName: '',
      currentTablesArray: null
    }
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
    //this.handleFindTableSubmit = this.handleFindTableSubmit.bind(this)
    this.handleFindAllTables = this.handleFindAllTables.bind(this)
  }

  handleDatabaseChange (event) {
    this.setState({
      currentDatabaseName: event.target.value
    })
  }

  handleTableChange (event) {
    this.setState({
      currentTableName: event.target.value
    })
  }

  handleFindAllTables(event) {
    event.preventDefault();
    const client = new pg.Client(`postgres://localhost/${this.state.currentDatabaseName}`)
    client.connect()
    client.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'public'")
    .then (data => {
      this.setState({
        currentTablesArray: data.rows
      })
      console.log('data.rows from findAllTables', data.rows)
    })
    .catch (err => console.log(err))
  }

  findAllColumns(tableName) {
    const client = new pg.Client(`postgres://localhost/${this.state.currentDatabaseName}`)
    client.connect()
    let query = "SELECT column_name FROM information_schema.columns WHERE table_name = '" + tableName + "'"
    console.log('******* query is: ', query)
    return client.query(query)
    .then (data => {
      console.log('findAllColumns in promise', data.rows)
      return data.rows
    })
    .catch (err => console.log(err))
  }

  render() {
    let tableArray
    // this.findAllColumns().then( datarows => console.log('findAllColumns', datarows))
    return (
      <div>
        <div className="container">
          <form onSubmit={ event => this.handleFindAllTables(event) } >
            <FormGroup controlId="formBasicText">
              <ControlLabel>Name of Database: </ControlLabel>
              <FormControl
                type="text"
                value={this.state.currentDatabaseName}
                placeholder="Enter database name"
                onChange={event => this.handleDatabaseChange(event)}
              />
            </FormGroup>
            <p />
            <Button bsStyle="primary" type='submit'>
              Connect to Database
            </Button>
          </form>

            { this.state.currentTablesArray &&
            this.state.currentTablesArray.map( x =>
              <li key={x.table_name}> { x.table_name }
                {/*{
                this.findAllColumns( x.table_name ).then( datarows => datarows.map( y =>
                  <li key = { y.column_name }> { y.column_name } </li>))
                }*/}
              </li>)
            }

            {
              this.state.currentTablesArray &&
            <SQLForm />
            }

            {/*<BarChart />*/}
        </div>
      </div>
    );
  }
}

// ----------------------- Container -----------------------
import { setCurrentData } from '../reducers/dataReducer.jsx'

const mapStateToProps = (state, ownProps) => (
  {
    currentData: state.data.currentData
  }
)
//should we use the object formatting here? KH
const mapDispatchToProps = dispatch => ({
  setCurrentData: data => dispatch(setCurrentData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TalkToDatabase)
