import React, {Component} from 'react'
import {connect} from 'react-redux'
import SQLForm from './SQLForm.jsx'
import ExplorerChart from './ExplorerChart.jsx'
import D3TextEditor from './D3TextEditor.jsx'
import {chartGenerator, storeChartGenerator} from '../utils/chartGenerators'
import {DEFAULT_TEMPLATE} from '../constants'
import PageHeader from './PageHeader'
import AddCardToDashForm from './AddCardToDashForm.jsx'
import SliceSelector from './SliceSelector.jsx'
import AxisSelector from './AxisSelector.jsx'
import {addCardToDashboard} from '../reducers/dashboardReducer.jsx'
import {addCard} from '../reducers/cardReducer.jsx'

class ExplorerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCode: DEFAULT_TEMPLATE,
      template: DEFAULT_TEMPLATE,
      cardTitle: 'Pick Your Title',
      currentSlice: props.data.allSlices[0],
      config: {}
    }
    this.handleCodeFromTextEditor = this.handleCodeFromTextEditor.bind(this)
    this.handleAddCardToDashboard = this.handleAddCardToDashboard.bind(this)
    this.handleChangeSlice = this.handleChangeSlice.bind(this)
    this.changeConfig = this.changeConfig.bind(this)
  }

  handleChangeSlice(e) {
    const userSpecifiedSliceTitle = e.target.value
    const [newSlice] = this.props.data.allSlices.filter(slice => slice.title===userSpecifiedSliceTitle)
    this.setState({currentSlice: newSlice})
  }

  handleCodeFromTextEditor(text) {
    this.setState({userCode: text})
  }

  changeConfig(attributeToChange){
    let stateUpdater = newValue => {
      const oldValue = this.state[attributeToChange] || {}
      const updatedConfig = Object.assign(oldValue, newValue)
      this.setState({[attributeToChange]: updatedConfig})
    }
    return stateUpdater.bind(this)
  }

  handleAddCardToDashboard(e, dashboardId) {
    e.preventDefault()
    this.props.addCardToCards({title: this.state.cardTitle, rawCode: this.state.userCode, chart: storeChartGenerator(this.state.userCode)})
    setTimeout(() => {
      const newCard = this.props.cards[this.props.cards.length - 1]
      this.props.addCardToDashboard(+dashboardId, newCard)
    }, 20)
  }

  render() {
    return (
  <div className='container'>
   <PageHeader header="Explorer" />
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
        <SliceSelector
          changeSlice={this.handleChangeSlice}
          currentSlice={this.state.currentSlice}
        />
        <AxisSelector
          label='X Axis'
          attribute={'x_axis'}
          currentSetting = {this.state.config.x_axis}
          currentSlice={this.state.currentSlice}
          changeConfig={this.changeConfig}
        />
        <AxisSelector
          label='Y Axis'
          attribute={'y_axis'}
          currentSetting = {this.state.config.y_axis}
          currentSlice={this.state.currentSlice}
          changeConfig={this.changeConfig}
        />
        <AddCardToDashForm handleSubmit={this.handleAddCardToDashboard} />
        </div>
        <div className="col-sm-9">
        <ExplorerChart cardTitle={this.state.cardTitle} userCode={this.state.userCode} />
        </div>
      </div>
    </div>
    <D3TextEditor handleCode={this.handleCodeFromTextEditor} codeForEditor={this.state.userCode || this.state.template} />
  </div>)
  }
}

const mapStateToProps = (state) => (
  {
    availableDashboards: state.dashboards.dashboards,
    currentDashboard: state.dashboards.currentDashboard,
    cards: state.cards,
    data: state.data
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    addCardToCards: (card) => dispatch(addCard(card)),
    addCardToDashboard: (dashboardId, card) => dispatch(addCardToDashboard(dashboardId, card))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerView)
