
const d3 = require('d3')
const fs = require('fs')
const path = require('path')
import {DEFAULT_TEMPLATE} from '../constants'
import ReactFauxDom from 'react-faux-dom'
import store from '../store.jsx'

export function chartGenerator(userGeneratedCode = DEFAULT_TEMPLATE) {
  eval(userGeneratedCode)
  return window.explorerFauxNode.toReact()
}
function datalessChartGenerator(userGeneratedCode = DEFAULT_TEMPLATE) {
  return (data) => {
    eval(userGeneratedCode)
    return window.explorerFauxNode
  }
}

export function IIFChartGenerator(userCode){
  let result = eval(userCode)
  return (data, config) => result(data, config)
}
// function gentleCustomChartGenerator(config, template) {
//   const parsedConfig = parseConfig(config)
//   return gentleChartGenerator(parsedConfig + template)
// }

function parseConfig(config) {
  const dataString = JSON.stringify(config.data)
  return `let data = ${dataString}
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

