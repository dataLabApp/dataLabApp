
const pg = require('pg')
const client = new pg.Client('postgres://localhost/headSetLaunch')
const path = require('path')

const seedQuery= `INSERT INTO "sales" (Date,Sales) VALUES ('May 3, 2017',10652),('May 4, 2017',17342),('May 5, 2017',15450),('May 6, 2017',22530),('May 7, 2017',33750),('May 8, 2017',15450),('May 9, 2017',34620),('May 10, 2017',38205)`

client.connect()

client.query(`DROP TABLE IF EXISTS sales`, function(err, data) {
  if (err)console.error(err)
  else console.log('dropped sales')
})
client.query(`CREATE TABLE "sales" (id SERIAL PRIMARY KEY, Date varchar(255), Sales integer NULL)`, function(err, data) {
  if (err)console.error(err)
  else {
    console.log('table created')
  }
})
client.query(seedQuery, function(err, data){
  if (err)console.log(err)
  else {
    console.log('looks like seeding sales worked')
    client.end()
  }
})
