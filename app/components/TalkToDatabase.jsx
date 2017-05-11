import React, { Component } from 'react';
import {Form, FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap'
import { connect } from 'react-redux'
import SQLForm from './SQLForm'
import PageHeader from './PageHeader'
//import { Link } from 'react-router-dom';
import styles from '../../assets/css/TalkToDatabase.css';
import BarChart from './BarChart'
import Table from './Table'
import SaveSliceModal from './SaveSliceModal'

const pg = require('pg')


class TalkToDatabase extends Component {
  constructor (props) {
    super (props)
    this.state = {
      currentDatabaseName: 'video-shopper',
      currentTablesArray: [],
      currentSQLQuery: "SELECT name, description, price FROM product JOIN review ON product.id = review.product_id WHERE review.stars = '5'",
      currentData: null,
      showModal: false,
      currentSliceName: ''
    }
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this)
    this.handleFindAllTables = this.handleFindAllTables.bind(this)
    this.findAllColumns = this.findAllColumns.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleSaveSlice = this.handleSaveSlice.bind(this)
    this.handleSliceNameChange = this.handleSliceNameChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      currentSQLQuery: event.target.value
    })
  }

  handleSliceNameChange(event) {
    this.setState({
      currentSliceName: event.target.value
    })
    console.log(this.state.currentSliceName)
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

  handleShowModal(){
    this.setState({
      showModal: true
    })
  }

  handleSaveSlice(event){
    // this.setState({
    //   showModal: false
    // })
    this.props.addSlice({
      title: event.target.value,
      dateCreated: new Date(),
      SQLQuery: currentSQLQuery,
      data: this.currentData
    })
    console.log('yay')
  }

  render() {
    return (
      <div>
        <div className="container">
          <Form inline onSubmit={ event => this.handleFindAllTables(event) } >
            <FormGroup controlId="formBasicText">
              <ControlLabel>Name of Database</ControlLabel>
              {'  '}
              <FormControl
                type="text"
                value={this.state.currentDatabaseName}
                placeholder="Enter database name"
                onChange={event => this.handleDatabaseChange(event)}
              />
            </FormGroup>
            {'    '}
            <Button bsStyle="primary" type='submit'>
              Connect to Database
            </Button>
          </Form>
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
            <p />
            {/*<BarChart />*/}

            {
            this.state.currentData &&
            <Table columns = { Object.keys(this.state.currentData[0]) } rows = {(this.state.currentData) } tableName = { this.state.currentSQLQuery } />
            }

            {
            this.state.currentData &&
            <Button bsStyle="primary" type='submit' onClick={ (event) => {
              this.props.setCurrentData(this.state.currentData)
              this.handleShowModal()
              }
            }>
              Save Slice
            </Button>
            }

            {
              this.state.showModal &&
              <SaveSliceModal handleSaveSlice={ this.handleSaveSlice } handleSliceNameChange={ this.handleSliceNameChange } />
            }

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
  setCurrentData: data => dispatch(setCurrentData(data)),
  addSlice: sliceObj => dispatch(addSlice(sliceObj))
})



export default connect(mapStateToProps, mapDispatchToProps)(TalkToDatabase)
