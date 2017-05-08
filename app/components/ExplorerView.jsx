import React from 'react'
import SQLForm from './SQLForm.jsx'
import WidgetCard from './WidgetCard.jsx'
import D3TextEditor from './D3TextEditor.jsx'

export default (props)=>(
  <div>Welcome to the explorer!
    <SQLForm />
    <WidgetCard />
    <D3TextEditor />
  </div>)
