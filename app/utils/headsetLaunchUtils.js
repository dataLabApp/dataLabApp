
const pg = require('pg')
const client = new pg.Client('postgres://localhost/headSetLaunch')

client.connect()

export function seedHeadsetData() {
  const continuousSeed = window.setInterval(function() {
    seedTweetsOnce()
    seedTweetsOnce()
    seedSegmentsOnce()
    seedSegmentsOnce()
    seedSalesOnce()
  }, 1000)
  window.setTimeout(() => window.clearInterval(continuousSeed), 60*1000)
}

function seedTweetsOnce() {
  const query = generateRandomTweetDataRow()
  client.query(query, function(err, data) {
    if (err)console.log(err)
    else {
      console.log('tweets updated')
    }
  })
}

const words = {'powerful': 2, 'new': 2, 'dope': 2, 'high-tech': 2, 'fun': 2, 'great': 2, 'cool': 2, 'expensive': 2, 'cost': 2}

function generateRandomTweetDataRow() {
  const randomWordIndex = Math.floor(Math.random()*9)
  const word = Object.keys(words)[randomWordIndex]
  const previousOccurrences = words[word]
  const newOccurrences = previousOccurrences+(9-randomWordIndex)
  words[word] = newOccurrences
  return `UPDATE "tweets" SET "occurrences" = ${newOccurrences} WHERE word = '${word}'`
}


function seedSegmentsOnce() {
  const query = generateRandomSegmentDataRow()
  client.query(query, function(err, data) {
    if (err)console.log(err)
    else {
      console.log('segments updated')
    }
  })
}

const segments = ['Gaming', 'Educ', 'Govt', 'Business', 'Other']

function generateRandomSegmentDataRow() {
  const randomSegmentIndex = Math.floor(Math.random()*5)
  const segment = segments[randomSegmentIndex]
  const change = 0.95 + Math.random() * 0.10
  return `UPDATE "segments" SET "sales" = sales * ${change} WHERE segment = '${segment}'`
}


function seedSalesOnce() {
  const query = generateRandomSaleDataRow()
  client.query(query, function(err, data) {
    if (err)console.log(err)
    else {
      console.log('Sales updated')
    }
  })
}

let Months = ['May', 'June', 'July', 'August']

let prevSale= {month: 'May', monthIndex: 0, date: 17, amount: 38205}

function generateRandomSaleDataRow() {
  let newDate = ++prevSale.date
  let newSaleAmount = 0.9 * prevSale.amount + (Math.random() * 0.30) * prevSale.amount
  if (newDate > 31 || (prevSale.month === 'June' && newDate === 31)) {
    newDate = 1
    prevSale.date = 1
    prevSale.month = Months[++prevSale.monthIndex]
  }
  const completeDate = prevSale.month + ' ' + newDate+ ', 2017'
  prevSale.amount = newSaleAmount
  return `INSERT INTO "sales" (date, sales) VALUES ('${completeDate}',${newSaleAmount})`
}
