
const pg = require('pg')
const client = new pg.Client('postgres://localhost/headSetLaunch')
const path = require('path')

const seedQuery= `INSERT INTO "segments" (Segment,Sales) VALUES ('Gaming',80),('Educ',10),('Govt',10),('Business',10),('Other',5)`

client.connect()

client.query(`DROP TABLE IF EXISTS segments`, function(err, data) {
  if (err)console.error(err)
  else console.log('dropped segments')
})
client.query(`CREATE TABLE "segments" (id SERIAL PRIMARY KEY,  Segment TEXT default NULL,  Sales integer NULL)`, function(err, data) {
  if (err)console.error(err)
  else {
    console.log('table created')
  }
})
client.query(seedQuery, function(err, data){
  if (err)console.log(err)
  else {
    console.log('looks like seeding segments worked')
    client.end()
  }
})
