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
import {addCard} from '../reducers/cardReducer.jsx'

class ExplorerView extends Component{
  constructor(props){
    super(props)
    this.state = {userCode: DEFAULT_TEMPLATE, template: DEFAULT_TEMPLATE, cardTitle: 'Products'}
    this.handleCodeFromTextEditor = this.handleCodeFromTextEditor.bind(this)
    this.handleAddCardToDashboard = this.handleAddCardToDashboard.bind(this)
  }

  handleCodeFromTextEditor(text){
    this.setState({userCode: text})
  }

  handleAddCardToDashboard(e, dashboardId){
    e.preventDefault()
    this.props.addCardToCards({title: this.state.cardTitle, chart: barChartGenerator(this.state.userCode)})
    setTimeout(()=>{
      let newCard = this.props.cards[this.props.cards.length - 1]
      this.props.addCardToDashboard(+dashboardId, newCard)
    },20)
  }

  render (){
    return (
      <div>
        <PageHeader header="Explorer" />
        <AddCardToDashForm handleSubmit={this.handleAddCardToDashboard} />
        <ExplorerChart cardTitle={this.state.cardTitle} userCode={this.state.userCode} chartGenerator={barChartGenerator}/>
        <D3TextEditor handleCode={this.handleCodeFromTextEditor} codeForEditor={this.state.userCode || this.state.template} />
      </div>)
  }
}

let mapStateToProps = (state)=>(
  {
    availableDashboards: state.dashboards.dashboards,
    currentDashboard: state.dashboards.currentDashboard,
    cards: state.cards
  }
)

let mapDispatchToProps = (dispatch)=>(
  {
    addCardToCards: (card)=>dispatch(addCard(card)),
    addCardToDashboard: (dashboardId, card)=>dispatch(addCardToDashboard(dashboardId, card))
  }
)

export default connect(mapStateToProps,mapDispatchToProps)(ExplorerView)
