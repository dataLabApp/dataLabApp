import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap'



export default class SQLForm extends Component {
  constructor(props) {
    super(props)
    this.state = { query: 'SELECT * FROM product' }
    this.updateDB = this.updateDB.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }

  updateDB(e) {
    window.client.query(this.state.query, function (err, data) {
      if (err) console.error(err)
      else {
        console.log('the query succeeded, type window.TEMPDB in the console to see the new db')
        window.TEMPDB = data.rows
      }
    })
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <p />
          <form onSubmit={this.updateDB}>
            <FormGroup controlId="formsControlTextarea">
              <ControlLabel>Enter SQL Query: </ControlLabel>
              <FormControl componentClass="textarea" placeholder="Enter SQL Query here: " value={this.state.query} onChange={this.handleChange} />
            </FormGroup>
            <Button bsStyle="primary" type='submit'>
              Submit Query
            </Button>
          </form>
      </div>
    )
  }
}

// function respondWithAllTweets(req, res, next) {
//   client.query(baseQuery, function(err, data) {
//     if (err) return next(err);
//     res.render('index', {
//       title: 'Twitter.js',
//       tweets: data.rows,
//       showForm: true
//     });
//   })
// }
