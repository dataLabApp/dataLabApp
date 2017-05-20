
const pg = require('pg')
const client = new pg.Client('postgres://localhost/headsetLaunch')
const path = require('path')

const seedQuery= `INSERT _________________PUT YOUR ROWS HERE__________________`

    client.connect()

    client.query(`DROP TABLE IF EXISTS inventory`, function(err, data){
      if(err)console.error(err)
      else console.log('dropped inventory')
    })
    client.query(`CREATE TABLE inventory _________put your scheme from generator here_________`, function(err, data){
      if(err)console.error(err)
      else{
        console.log('table created')
      }
    })
    client.query(seedQuery, function(err, data){
      if(err)console.log(err)
      else{
        console.log('looks like seeding inventory worked')
        client.end()
      }
    })
