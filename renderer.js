// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const pg = require('pg')
const client = new pg.Client('postgres://localhost/video-shopper')

client.connect()

client.query('SELECT * FROM product', function(err, data){
  if(err)console.log(err)
  else{
    window.TEMPDB = data.rows
  }
})

window.client = client
