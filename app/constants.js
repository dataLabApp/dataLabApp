let fs = require('fs')
let path = require('path')

export const ItemTypes = {
  CARD: 'card',
  VIEW: 'view'
}

export const DEFAULT_TEMPLATE = fs.readFileSync(path.join(path.dirname(window.location.pathname),'/app/utils/barChartTemplate.js'),{encoding: 'utf-8'})

export const snapSensitivity = 10;
