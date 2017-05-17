import React, { Component } from 'react'
import {Form, FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap'
import { connect } from 'react-redux'
import SQLForm from './SQLForm'
import PageHeader from './PageHeader'
import styles from '../../assets/css/TalkToDatabase.css'
import BarChart from './BarChart'
import Table from './Table'
import SaveSliceModal from './SaveSliceModal'
import history from '../main'

const pg = require('pg')

class TalkToDatabase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDatabaseName: 'video-shopper',
      databases: [],
      currentTablesArray: [],
      currentSQLQuery: "SELECT name, description, price FROM product JOIN review ON product.id = review.product_id WHERE review.stars = '5'",
      currentData: null,
      showModal: false,
      currentSliceName: '',
      client: new pg.Client(`postgres://localhost/video-shopper`),
      rows: [],
      showQueryBox: false
    }
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this)
    this.handleFindAllTables = this.handleFindAllTables.bind(this)
    this.findAllColumns = this.findAllColumns.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleSaveSlice = this.handleSaveSlice.bind(this)
    this.handleSliceNameChange = this.handleSliceNameChange.bind(this)
    this.handleFindAllDatabases = this. handleFindAllDatabases.bind(this)
    this.createRows = this. createRows.bind(this)
    this.toggleQueryBox = this. toggleQueryBox.bind(this)


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
  }

  handleDatabaseChange(event) {
    this.setState({
      currentDatabaseName: event.target.value,
      client: new pg.Client(`postgres://localhost/${event.target.value}`)
    })
    this.handleFindAllTables();
  }

  handleQuery(event) {
    this.state.client.query(this.state.currentSQLQuery, (err, data) => {
      if (err) console.error(err)
      else {
        this.setState({
          currentData: data.rows
        })
      }
    })
    event.preventDefault()
  }

  handleFindAllDatabases(event) {
    let array = []
    // let columnNames
    // event.preventDefault()
    const client = new pg.Client(`postgres://localhost/`)
    client.connect()
    client.query("SELECT datname FROM pg_database WHERE datistemplate = false")
    .then(data => { 
      data.rows.forEach(x=> {
        array.push(x.datname); 
      })
      this.setState({
            databases: array
          })
      this.handleFindAllTables();
    })
    .catch(err => console.log(err))
    // this.setState({client})
  };

  handleFindAllTables() {
    let array = []
    let columnNames
    // event.preventDefault()
    const client = new pg.Client(`postgres://localhost/${this.state.currentDatabaseName}`)
    client.connect()
    client.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'public'")
    .then(data => {
      data.rows.forEach(x => {
        this.findAllColumns(x.table_name)
        .then(columnArray => {
          array.push({
            tableName: x.table_name,
            columnNames: columnArray
          })
          this.setState({
            currentTablesArray: array
          })
          this.createRows();
        })
      })
    })
    .catch(err => console.log(err))
    this.setState({client})
  }

  findAllColumns(tableName) {
    let columnArray = []
    const client = new pg.Client(`postgres://localhost/${this.state.currentDatabaseName}`)
    client.connect()
    let query = "SELECT column_name FROM information_schema.columns WHERE table_name = '" + tableName + "'"
    return client.query(query)
    .then(data => {
      data.rows.forEach(x => {
        columnArray.push(x.column_name)
      })
      return columnArray
    })
    .catch(err => console.log(err))
  }

  handleShowModal() {
    this.setState({
      showModal: true
    })
  }

  handleSaveSlice(event) {
    // this.setState({
    //   showModal: false
    // })
    event.preventDefault()
    this.props.addSlice({
      title: event.target.sliceName.value,
      dateCreated: new Date(),
      SQLQuery: this.state.currentSQLQuery,
      data: this.state.currentData,
      database: this.state.currentDatabaseName
    })
    history.push('/explorer')
  }

  createRows(){
    let rows = this.state.currentTablesArray.map((x)=> {
      return {tableName: x.tableName, columnNames: x.columnNames.join(', ')}
    });
    this.setState({
      rows: rows
    })
  }

  toggleQueryBox(){
    let bool = !this.state.showQueryBox;
    this.setState({
      showQueryBox: bool
    })
  }

  render() {
    if (this.state.databases.length ===0 ) {
      this.handleFindAllDatabases()
    }

    return (
      
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
        {
          // <Button onClick = {this.handleFindAllDatabases}>Connect to PostGres</Button>
        }
          <form>
              <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select a Database</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleDatabaseChange}>
              {this.state.databases && this.state.databases.map((databaseName,i)=>{
                return <option key = {i} value={databaseName}>{databaseName}</option>
              })
            }</FormControl>
            
            </FormGroup>
            <FormGroup>
            <ControlLabel>Enter a SQL Query</ControlLabel>
            <Button className="btn-block" onClick={this.toggleQueryBox}>{`query ${this.state.currentDatabaseName}`}</Button>
            </FormGroup>
          </form>
           
        </div>
         
          {
          // <Form onSubmit={ event => this.handleFindAllTables(event) } >
          //   <Button type='submit'>
          //     Connect to Database
          //   </Button>
          // </Form>
          }
          <p />
            { 
            //   this.state.currentTablesArray.length > 0 &&
            // this.state.currentTablesArray.map(x =>
            //   <li key={x.tableName}> { x.tableName }: { x.columnNames.join(', ') }
            //   </li>)
          }
          <div className="col-sm-9">
            {
            this.state.showQueryBox &&
            <SQLForm {...this.state} handleChange = { this.handleChange } handleQuery = { this.handleQuery } />
            }
            { 
              this.state.currentTablesArray.length > 0 &&
            <Table columns = {['tableName', 'columnNames']} rows = {this.state.rows} tableName={`Tables in ${this.state.currentDatabaseName}`}/>
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
    </div>
    )
  }
}

// ----------------------- Container -----------------------
import { setCurrentData, addSlice } from '../reducers/dataReducer.jsx'

const mapStateToProps = (state, ownProps) => (
  {
    currentData: state.data.currentData
  }
)
// should we use the object formatting here? KH
const mapDispatchToProps = dispatch => ({
  setCurrentData: data => dispatch(setCurrentData(data)),
  addSlice: sliceObj => dispatch(addSlice(sliceObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(TalkToDatabase)
