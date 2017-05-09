import React, {Component} from 'react'
import SQLForm from './SQLForm.jsx'
import WidgetCard from './WidgetCard.jsx'
import D3TextEditor from './D3TextEditor.jsx'
import {barChartGenerator} from '../utils/chartGenerators'
import {DEFAULT_TEMPLATE} from '../constants'

class ExplorerView extends Component{
  constructor(props){
    super(props)
    this.state = {userCode: null, template: DEFAULT_TEMPLATE}
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
        <D3TextEditor handleCode={this.handleCodeFromTextEditor} codeForEditor={this.state.userCode || this.state.template} />
      </div>)
  }
}

export default ExplorerView
