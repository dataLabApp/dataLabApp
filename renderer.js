// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const pg = require('pg')
const oldClient = new pg.Client('postgres://localhost/video-shopper')

oldClient.connect()

oldClient.query('SELECT * FROM product', function(err, data) {
  if (err)console.log(err)
  else {
    window.TEMPDB = data.rows
  }
})

let ReactFauxDOM = require('react-faux-dom')
window.ReactFauxDOM = ReactFauxDOM

const d3 = require('d3')
window.d3 = d3

window.createHook = (comp, elem, statename) => {
  let elems = new Map(),
    interval
  const updateState = () => {
    comp.setState({[statename]: elem.toReact()})
  }
  setTimeout(updateState)
  comp.isAnimating = () => !!interval
  return (transition) => {
    transition.each((e) => {
      elems.set(e, (elems.get(e) || new Set()).add(transition.id))
      interval = interval || setInterval(updateState, 16)
    })
    transition.on('end', (e) => {
      const anims = elems.get(e)
      anims.delete(transition.id)
      if (anims.size) {
        elems.set(e, anims)
      } else {
        elems.delete(e)
      }
      if (!elems.size) interval = clearInterval(interval)
    })
  }
}
