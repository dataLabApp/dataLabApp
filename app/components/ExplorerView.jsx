import React, {Component} from 'react'
import {connect} from 'react-redux'
import SQLForm from './SQLForm.jsx'
import ExplorerChart from './ExplorerChart.jsx'
import D3TextEditor from './D3TextEditor.jsx'
import {chartGenerator, storeChartGenerator} from '../utils/chartGenerators'
import {DEFAULT_TEMPLATE, HEADLESS_TEMPLATE} from '../constants'
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
      userCode: HEADLESS_TEMPLATE,  //this should actually prepend the settings-based-code
      template: HEADLESS_TEMPLATE,
      config: {
        sliceId: props.data.allSlices[0].id,
        data: props.data.allSlices[0].data.slice(),
        title: 'Pick Your Title',
        x: {
          dataColumn: Object.keys(props.data.allSlices[0].data[0])[0]
        },
        y: {
          dataColumn: Object.keys(props.data.allSlices[0].data[0])[1]
        }
      }
    }
    this.handleCodeFromTextEditor = this.handleCodeFromTextEditor.bind(this)
    this.handleAddCardToDashboard = this.handleAddCardToDashboard.bind(this)
    this.handleChangeSlice = this.handleChangeSlice.bind(this)
    this.changeConfig = this.changeConfig.bind(this)
  }

  componentDidMount(){
    this.setState()
  }

  handleChangeSlice(e) {
    const userSpecifiedSliceTitle = e.target.value
    const [newSlice] = this.props.data.allSlices.filter(slice => slice.title===userSpecifiedSliceTitle)
    const newSliceId = newSlice.id
    const oldConfig = this.state.config
    const newConfig = Object.assign(oldConfig, {data: newSlice.data.slice(), sliceId: newSliceId})
    this.setState({config: newConfig})
  }

  handleCodeFromTextEditor(text) {
    this.setState({userCode: text})
  }

  changeConfig(attributeToChange){
    let stateUpdater = newAttribute => {
      const oldAttributeValues = this.state.config[attributeToChange] || {}
      const updatedAttributes = Object.assign(oldAttributeValues, newAttribute)
      const oldConfig = this.state.config
      const newConfig = Object.assign(oldConfig, {[attributeToChange]: updatedAttributes})
      this.setState({config: newConfig})
    }
    return stateUpdater.bind(this)
  }

  handleAddCardToDashboard(e, dashboardId) {
    e.preventDefault()
    this.props.addCardToCards({title: this.state.config.title, sliceId: this.state.config.sliceId, config: this.state.config, rawCode: this.state.userCode, chart: storeChartGenerator(this.state.config, this.state.userCode)})
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
          currentSlice={this.state.config.data}
        />
        <AxisSelector
          label='X Axis'
          attribute='x'
          currentSettings = {this.state.config.x || {}}
          currentSlice={this.state.config.data}
          changeConfig={this.changeConfig}
        />
        <AxisSelector
          label='Y Axis'
          attribute='y'
          currentSettings = {this.state.config.y || {}}
          currentSlice={this.state.config.data}
          changeConfig={this.changeConfig}
        />
        <AddCardToDashForm handleSubmit={this.handleAddCardToDashboard} />
        </div>
        <div className="col-sm-9">
        <ExplorerChart cardTitle={this.state.config.title} config={this.state.config} userCode={this.state.userCode} />
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
