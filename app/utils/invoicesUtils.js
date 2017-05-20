
const pg = require('pg')
const client = new pg.Client('postgres://localhost/headSetLaunch')
const path = require('path')

client.connect()

export function seedInvoiceData() {
  const continuousSeed = window.setInterval(function() {
    seedInventoryOnce()
  }, 1000)
  window.setTimeout(() => window.clearInterval(continuousSeed), 100*1000)
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
function seedInventoryOnce() {
  const query = generateReduceInventory()
  client.query(query, function(err, data) {
    if (err)console.log(err)
    else {
      console.log('inventory reduced')
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
const invObj = {'1': 416, '2': 604, '3': 569, '4': 393}
function generateReduceInventory() {
  let amt = 0
  const amount = `${(Math.round(Math.random()*20))}`
  const amountBig = 3 * amount
  let id = `${Math.floor(Math.random()*4)+ 1}`
  if (id === '1' || id === '3') amt = amountBig
  else if (id === '4') amt = amount
  else amt = 0
  const updateAmt = invObj[id] - amt
  invObj[id] = updateAmt
  console.log('amount amt, updateAmt, invObj.id, id', amount, amt, updateAmt, invObj, +id)
  id = +id
  return `UPDATE "inventory" SET inventory = ${updateAmt} WHERE id = ${id}`
}
