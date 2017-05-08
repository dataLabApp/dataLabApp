import React, {Component} from 'react'
import SQLForm from './SQLForm.jsx'
import WidgetCard from './WidgetCard.jsx'
import D3TextEditor from './D3TextEditor.jsx'
var ReactFauxDOM = require('react-faux-dom')

class ExplorerView extends Component{
  constructor(props){
    super(props)
    this.runCodeFromTextEditor = this.runCodeFromTextEditor.bind(this)
  }
  runCodeFromTextEditor(text){
    eval(text)
  }

  render (){
  return (
    <div>Welcome to the explorer!
      <SQLForm />
      <WidgetCard />
      <D3TextEditor runCode={this.runCodeFromTextEditor} />
    </div>)
  }
}

export default ExplorerView
