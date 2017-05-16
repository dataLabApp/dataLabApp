let fs = require('fs')
let path = require('path')

export const ItemTypes = {
  CARD: 'card',
  VIEW: 'view'
}

export const DEFAULT_TEMPLATE = fs.readFileSync(path.join(decodeURI(path.dirname(window.location.pathname)),'/app/utils/barChartTemplate.js'),{encoding: 'utf-8'})

export const HEADLESS_TEMPLATE = fs.readFileSync(path.join(path.dirname(window.location.pathname),'/app/utils/headlessBarChartTemplate.js'),{encoding: 'utf-8'})

export const ROOT_PATH = path.dirname(window.location.pathname)

export const snapSensitivity = 10
