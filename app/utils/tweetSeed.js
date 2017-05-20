
const pg = require('pg')
const client = new pg.Client('postgres://localhost/headsetLaunch')
const path = require('path')

const seedQuery= `INSERT INTO "tweets" (Word,Occurrences,Positive) VALUES ('great',2,1),('new',2,1),('cost',2,0),('fun',2,1),('high-tech',2,1),('expensive',2,0),('powerful',2,1),('dope',2,1),('cool',2,1)`

client.connect()

client.query(`DROP TABLE IF EXISTS tweets`, function(err, data) {
  if (err)console.error(err)
  else console.log('dropped tweets')
})
client.query(`CREATE TABLE "tweets" (id SERIAL PRIMARY KEY, Word TEXT default NULL, Occurrences integer NULL, Positive integer NULL)`, function(err, data) {
  if (err)console.error(err)
  else {
    console.log('table created')
  }
})
client.query(seedQuery, function(err, data){
  if (err)console.log(err)
  else {
    console.log('looks like seeding tweets worked')
    client.end()
  }
})
