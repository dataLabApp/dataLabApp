
let d3 = require('d3')
let fs = require('fs')
let path = require('path')
import {DEFAULT_TEMPLATE} from '../constants'

export function barChartGenerator(userGeneratedCode = DEFAULT_TEMPLATE){
  eval(userGeneratedCode)
  return window.explorerFauxNode.toReact()
}
