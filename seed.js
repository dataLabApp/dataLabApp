
const pg = require('pg')
const client = new pg.Client('postgres://localhost')
const path = require('path')

client.connect()

client.query('CREATE DATABASE worldbank', function(err, data){
  if(err)console.error(err)
  else{
    console.log('worldbank db created')
    const wbClient = new pg.Client('postgres://localhost/worldbank')
    wbClient.connect()
    wbClient.query('CREATE TABLE population(series_name varchar, series_code varchar, country varchar, country_code varchar, "1974" bigint, "1975" bigint, "1976" bigint, "1977" bigint, "1978" bigint, "1979" bigint, "1980" bigint, "1981" bigint, "1982" bigint, "1983" bigint, "1984" bigint, "1985" bigint, "1986" bigint, "1987" bigint, "1988" bigint, "1989" bigint, "1990" bigint, "1991" bigint, "1992" bigint, "1993" bigint, "1994" bigint, "1995" bigint, "1996" bigint, "1997" bigint, "1998" bigint, "1999" bigint, "2000" bigint, "2001" bigint, "2002" bigint, "2003" bigint, "2004" bigint, "2005" bigint, "2006" bigint, "2007" bigint, "2008" bigint, "2009" bigint, "2010" bigint, "2011" bigint, "2012" bigint, "2013" bigint, "2014" bigint, "2015" bigint)', function(err, data){
      if(err)console.error(err)
      else{
        console.log('table created')
      }
    })
    let worldPop = path.join(__dirname, '/worldPopulation.csv')
    console.log(worldPop)
    let queryString = `COPY population FROM '${worldPop}' DELIMITER ',' CSV HEADER`
    console.log(queryString)
    wbClient.query(queryString, function(err, data){
      if(err)console.log(err)
      else{
        console.log('looks like it worked')
        client.end()
        wbClient.end()
      }
    })
  }
})


