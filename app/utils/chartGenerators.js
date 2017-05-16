
const d3 = require('d3')
const fs = require('fs')
const path = require('path')
import {DEFAULT_TEMPLATE} from '../constants'
import ReactFauxDom from 'react-faux-dom'

export function chartGenerator(userGeneratedCode = DEFAULT_TEMPLATE) {
  eval(userGeneratedCode)
  return window.explorerFauxNode.toReact()
}

function parseConfig(config) {
  window.TEMPDB = config.data
  return `let data = window.TEMPDB
  const x = '${config.x.dataColumn}'
  const y = '${config.y.dataColumn}'
  const chartTitle = '${config.title}'`
}

export function customChartGenerator(config, template) {
  const parsedConfig = parseConfig(config)
  return chartGenerator(parsedConfig + template)
}

export function storeChartGenerator(...args) {
  if (args.length===2) return () => customChartGenerator(...args)
  else if (args.length===1) return () => chartGenerator(...args)
}

// export chartGenerator(){
//   return new Function('data','node',`
//     import ReactFauxDom from 'react-faux-dom'
//     import d3 from 'd3'
//     let chartNode = ReactFauxDOM.createElement('svg')
//     let svg = d3.select(chartNode)
//   `)
// }
