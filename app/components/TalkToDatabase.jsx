import React, { Component } from 'react';
import {Form, FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom';
<<<<<<< HEAD
import styles from '../../assets/css/TalkToDatabase.css';
=======
import styles from '../../assets/TalkToDatabase.css';
const pg = require('pg')


class TalkToDatabase extends Component {
  constructor (props) {
    super (props)
    this.state = {
      currentDatabaseName: '',
      currentTableName: ''
    }
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
    this.handleFindTableSubmit = this.handleFindTableSubmit.bind(this)
    console.log(props)
  }

  handleDatabaseChange (event) {
    this.setState({
      currentDatabaseName: event.target.value
    })
    console.log(this.state.currentDatabaseName)
  }

  handleTableChange (event) {
    this.setState({
      currentTableName: event.target.value
    })
    console.log(this.state.currentTableName)
  }

  // handleClick(){
  // const client = new pg.Client('postgres://localhost/video-shopper')
  // client.connect()
  // client.query('SELECT * FROM product', function(err, data){
  //   if(err)console.log(err)
  //   else{
  //     window.TEMPDB = data.rows
  //   }
  // })
  // window.client = client
  // console.log(client)
  // }

  handleFindTableSubmit(event) {
    event.preventDefault();
    console.log('************', this.props)
    const client = new pg.Client(`postgres://localhost/${this.state.currentDatabaseName}`)
    client.connect()
    client.query(`SELECT * FROM ${this.state.currentTableName}`, (err, data) => {
      if(err)console.log(err)
      else{
        console.log(data.rows)
        this.props.setCurrentData(data.rows)
      }
    })
    window.client = client
    console.log(client)
  }

>>>>>>> master

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h4>Talk To Database</h4>
          <Form onSubmit={ (event) => this.handleFindTableSubmit(event) } inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Name of Database: </ControlLabel>
              <FormControl type="text" value={this.state.currentDatabaseName} onChange={event => this.handleDatabaseChange(event)} />
              <p />
              <ControlLabel>Name of Table: </ControlLabel>
              <FormControl type="text" value={this.state.currentTableName} onChange={event => this.handleTableChange(event)} />
            </FormGroup>
            <p />
            <Button type='submit'>
              Find Table within Database
            </Button>
          </Form>


          {/*<button onClick={ () => this.handleClick()}>Click to connect to DB.</button>
          <Link to="/counter">to Counter</Link>*/}
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

const mapDispatchToProps = dispatch => ({
  setCurrentData: data => dispatch(setCurrentData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TalkToDatabase)
