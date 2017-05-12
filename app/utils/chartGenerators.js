
let d3 = require('d3')
let fs = require('fs')
let path = require('path')
import {DEFAULT_TEMPLATE} from '../constants'
import ReactFauxDom from 'react-faux-dom'

export function chartGenerator(userGeneratedCode = DEFAULT_TEMPLATE){
  eval(userGeneratedCode)
  return window.explorerFauxNode.toReact()
}

export function storeChartGenerator(userGeneratedCode){
  return ()=>chartGenerator(userGeneratedCode)
}

// export chartGenerator(){
//   return new Function('data','node',`
//     import ReactFauxDom from 'react-faux-dom'
//     import d3 from 'd3'
//     let chartNode = ReactFauxDOM.createElement('svg')
//     let svg = d3.select(chartNode)
//   `)
// }
