
const pg = require('pg')
const client = new pg.Client('postgres://localhost/datalabco')
const path = require('path')

client.connect()

export function seedInvoiceData() {
  const continuousSeed = window.setInterval(function(){
    seedInvoicesOnce()
    seedInvoicesOnce()
    seedInvoicesOnce()
  }, 1000)
  window.setTimeout(() => window.clearInterval(continuousSeed), 30*1000)
}

function seedInvoicesOnce() {
  const query = generateRandomDataRow()
  client.query(query, function(err, data) {
    if (err)console.log(err)
    else {
      console.log('new data row created')
    }
  })
}

const departments = ['Advertising', 'Asset Management', 'Legal Department', 'Media Relations', 'Payroll', 'Public Relations', 'Quality Assurance', 'Sales and Marketing', 'Research and Development', 'Tech Support']

function generateRandomDataRow() {
  const amount = `$${(Math.round(Math.random()*100000)) / 100}`
  const clientId = `${310+Math.floor(Math.random()*21)}`
  const department = departments[Math.floor(Math.random()*(departments.length))]
  const date = `${1+Math.floor(Math.random()*12)}/${1+Math.floor(Math.random()*29)}/${Math.round(Math.random())>0.5 ? '2016' : '2017'}`
  return `INSERT INTO "invoices" (amount,clientid,department,date) VALUES ('${amount}',${clientId},'${department}','${date}')`
}
