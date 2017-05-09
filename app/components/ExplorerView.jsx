import React, {Component} from 'react'
import SQLForm from './SQLForm.jsx'
import WidgetCard from './WidgetCard.jsx'
import D3TextEditor from './D3TextEditor.jsx'
var ReactFauxDOM = require('react-faux-dom')
import {barChartGenerator} from '../utils/chartGenerators'

class ExplorerView extends Component{
  constructor(props){
    super(props)
    this.state = {userCode: null}
    this.handleCodeFromTextEditor = this.handleCodeFromTextEditor.bind(this)
  }
  handleCodeFromTextEditor(text){
    this.setState({userCode: text})
  }

  render (){
    return (
      <div>Welcome to the explorer!
        <SQLForm />
        <WidgetCard userCode={this.state.userCode} chartGenerator={barChartGenerator}/>
        <D3TextEditor handleCode={this.handleCodeFromTextEditor} />
      </div>)
  }
}

export default ExplorerView
