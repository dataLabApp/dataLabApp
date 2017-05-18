// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const pg = require('pg')
const oldClient = new pg.Client('postgres://localhost/video-shopper')

oldClient.connect()

oldClient.query('SELECT * FROM product', function(err, data) {
  if (err)console.log(err)
  else {
    window.TEMPDB = data.rows
  }
})

let ReactFauxDOM = require('react-faux-dom')
window.ReactFauxDOM = ReactFauxDOM

const d3 = require('d3')
window.d3 = d3
