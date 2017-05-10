import React, {Component} from 'react'
import {connect} from 'react-redux'
import SQLForm from './SQLForm.jsx'
import ExplorerChart from './ExplorerChart.jsx'
import D3TextEditor from './D3TextEditor.jsx'
import {barChartGenerator} from '../utils/chartGenerators'
import {DEFAULT_TEMPLATE} from '../constants'
import PageHeader from './PageHeader'
import AddCardToDashForm from './AddCardToDashForm.jsx'
import {addCardToDashboard} from '../reducers/dashboardReducer.jsx'

class ExplorerView extends Component{
  constructor(props){
    super(props)
    this.state = {userCode: DEFAULT_TEMPLATE, template: DEFAULT_TEMPLATE, cardTitle: 'Products'}
    this.handleCodeFromTextEditor = this.handleCodeFromTextEditor.bind(this)
    this.handleAddCard = this.handleAddCard.bind(this)
  }

  handleCodeFromTextEditor(text){
    this.setState({userCode: text})
  }

  handleAddCard(e, dashboardTitle){
    e.preventDefault()
    let newCard = {x:1, y:Infinity, w:3, h:3, title: this.state.cardTitle, chart: barChartGenerator(this.state.userCode) }
    this.props.addCard(dashboardTitle, newCard)
  }

  render (){
    return (
      <div>
        <PageHeader header="Explorer" />
        <AddCardToDashForm handleSubmit={this.handleAddCard} />
        <ExplorerChart cardTitle={this.state.cardTitle} userCode={this.state.userCode} chartGenerator={barChartGenerator}/>
        <D3TextEditor handleCode={this.handleCodeFromTextEditor} codeForEditor={this.state.userCode || this.state.template} />
      </div>)
  }
}

let mapStateToProps = (state)=>(
  {
    availableDashboards: state.dashboards.dashboards,
    currentDashboard: state.dashboards.currentDashboard
  }
)

let mapDispatchToProps = (dispatch)=>(
  {
    addCard: (dashboardTitle, card)=>dispatch(addCardToDashboard(dashboardTitle, card))
  }
)

export default connect(mapStateToProps,mapDispatchToProps)(ExplorerView)
