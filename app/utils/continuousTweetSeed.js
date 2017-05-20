


function seedTweetsOnce() {
  const query = generateRandomTweetDataRow()
  client.query(query, function(err, data) {
    if (err)console.log(err)
    else {
      console.log('new data row created')
    }
  })
}

const words = {'powerful':2,'new':2,'dope':2,'high-tech':2,'fun':2,'great':2,'cool':2,'expensive':2,'cost':2}

function generateRandomTweetDataRow() {
  const randomWordIndex = Math.floor(Math.random()*9)
  const word = Object.keys(words)[randomWordIndex]
  const previousOccurrences = words[word]
  const newOccurrences = previousOccurrences*(9-randomWordIndex)
  return `UPDATE tweets SET occurrences = ${newOccurrences} WHERE word = ${word}`
}
