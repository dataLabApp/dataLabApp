
const pg = require('pg')
const client = new pg.Client('postgres://localhost/headsetLaunch')
const path = require('path')

const seedQuery= `INSERT INTO "tweets" (Word,Occurrences,Positive) VALUES ('great',2072,1),('new',2113,1),('cost',355,0),('fun',2009,1),('high-tech',2682,1),('expensive',1083,0),('powerful',1145,1),('dope',2738,1),('cool',1408,1)`

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
