
const pg = require('pg')
const client = new pg.Client('postgres://localhost/headSetLaunch')
const path = require('path')

const seedQuery=`INSERT INTO "inventory" (Location,Inventory) VALUES ('Seattle',416),('Ithaca',604),('Atlanta',596),('Miami',393);`
client.connect()

client.query(`DROP TABLE IF EXISTS inventory`, function(err, data) {
  if (err)console.error(err)
  else console.log('dropped inventory')
})

client.query(`CREATE TABLE inventory (id SERIAL PRIMARY KEY, Location varchar(255), Inventory integer NULL)`, function(err, data) {
  if (err) console.error(err)
  else console.log('table created')
})

client.query(seedQuery, function(err, data) {
  if (err) console.log(err)
  else {
    console.log('looks like seeding inventory worked')
    client.end()
  }
})
