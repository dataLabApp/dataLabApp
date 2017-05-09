
let d3 = require('d3')
import { fauxNode } from './barChartTemplate.js'
let fs = require('fs')
let path = require('path')

export function barChartGenerator(userGeneratedCode = fs.readFileSync(path.join(__dirname,'/barChartTemplate.js'))){
  eval(userGeneratedCode)
}
