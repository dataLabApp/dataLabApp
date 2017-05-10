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
      currentDatabaseName: 'video-shopper',
      currentTablesArray: [],
      currentSQLQuery: "SELECT name FROM product JOIN review ON product.id = review.product_id WHERE review.stars = '5'",
      currentData: null
    }
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this)
    this.handleFindAllTables = this.handleFindAllTables.bind(this)
    this.findAllColumns = this.findAllColumns.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
  }

  handleChange(event) {
    this.setState({
      currentSQLQuery: event.target.value
    })
  }

  handleDatabaseChange (event) {
    this.setState({
      currentDatabaseName: event.target.value
    })
  }

  handleQuery(event){
    client.query(this.state.currentSQLQuery, (err, data) => {
      if (err) console.error(err)
      else {
          console.log(data.rows)
        this.setState({
          currentData: data.rows
        })
      }
    })
    event.preventDefault()
  }

  handleFindAllTables(event) {
    let array = []
    let columnNames
    event.preventDefault();
    const client = new pg.Client(`postgres://localhost/${this.state.currentDatabaseName}`)
    client.connect()
    client.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'public'")
    .then (data => {
      data.rows.forEach( x => {
        this.findAllColumns(x.table_name)
        .then(columnArray => {
          array.push({
            tableName: x.table_name,
            columnNames: columnArray
          })
          this.setState({
          currentTablesArray: array
          })
        })
      })
    })
    .catch (err => console.log(err))
  }

  findAllColumns(tableName) {
    let columnArray = []
    const client = new pg.Client(`postgres://localhost/${this.state.currentDatabaseName}`)
    client.connect()
    let query = "SELECT column_name FROM information_schema.columns WHERE table_name = '" + tableName + "'"
    return client.query(query)
    .then (data => {
      data.rows.forEach( x => {
        columnArray.push(x.column_name)
      })
      return columnArray
    })
    .catch (err => console.log(err))
  }

  render() {
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
          <p />
            { this.state.currentTablesArray.length > 0 &&
            this.state.currentTablesArray.map( x =>
              <li key={x.tableName}> { x.tableName }: { x.columnNames.join(', ') }
              </li>)
            }

            {
              this.state.currentTablesArray.length > 0 &&
            <SQLForm {...this.state} handleChange = { this.handleChange } handleQuery = { this.handleQuery } />
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
