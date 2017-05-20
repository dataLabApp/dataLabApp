import React, {Component} from 'react'
import {connect} from 'react-redux'
import SQLForm from './SQLForm.jsx'
import ExplorerChart from './ExplorerChart.jsx'
import D3TextEditor from './D3TextEditor.jsx'
import {IIFChartGenerator} from '../utils/chartGenerators'
import {IIF_BAR_CHART, CHART_TEMPLATES, COLOR_SCHEMES} from '../constants'
import PageHeader from './PageHeader'
import AddCardToDashForm from './AddCardToDashForm.jsx'
import ChartTypeSelector from './ChartTypeSelector.jsx'
import SliceSelector from './SliceSelector.jsx'
import AxisSelector from './AxisSelector.jsx'
import ColorSelector from './ColorSelector.jsx'
import ChartSizer from './ChartSizer.jsx'
import {addCardToDashboard, setCurrentDashboard} from '../reducers/dashboardReducer.jsx'
import {addCard} from '../reducers/cardReducer.jsx'
import {Button} from 'react-bootstrap'



class ExplorerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTextEditor: false,
      showZ: false,
      userCode: IIF_BAR_CHART,  // this should actually prepend the settings-based-code
      template: IIF_BAR_CHART,
      chartType: 'Bar',
      x_label: 'Bar Name',
      y_label: 'Bar Height',
      z_label: '',
      config: {
        colorScheme: COLOR_SCHEMES[Object.keys(COLOR_SCHEMES)[0]],
        sliceId: props.data.allSlices[0].id,
        data: props.data.allSlices[0].data.slice(),
        title: 'Click Here to Write Title',
        dimensions: {
          fullHeight: 500,
          fullWidth: 800
        },
        x: {
          dataColumn: Object.keys(props.data.allSlices[0].data[0])[0]
        },
        y: {
          dataColumn: Object.keys(props.data.allSlices[0].data[0])[1]
        },
        z: {
          dataColumn: Object.keys(props.data.allSlices[0].data[0])[1]
        }
      }
    }
    this.handleCodeFromTextEditor = this.handleCodeFromTextEditor.bind(this)
    this.handleAddCardToDashboard = this.handleAddCardToDashboard.bind(this)
    this.handleChangeSlice = this.handleChangeSlice.bind(this)
    this.changeConfig = this.changeConfig.bind(this)
    this.setChartType = this.setChartType.bind(this)
    this.handleLoadState = this.handleLoadState.bind(this)
    this.toggleShowTextEditor = this.toggleShowTextEditor.bind(this)
  }
  toggleShowTextEditor() {
    this.setState({showTextEditor: !this.state.showTextEditor})
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

  changeConfig(attributeToChange) {
    if (typeof this.state.config[attributeToChange]==='object') {
      const stateUpdater = newAttribute => {
        const oldAttributeValues = this.state.config[attributeToChange] || {}
        const updatedAttributes = Object.assign(oldAttributeValues, newAttribute)
        const oldConfig = this.state.config
        const newConfig = Object.assign(oldConfig, {[attributeToChange]: updatedAttributes})
        this.setState({config: newConfig})
      }
      return stateUpdater.bind(this)
    } else {
      return (newValue) => {
        const newConfig = Object.assign(this.state.config, {[attributeToChange]: newValue})
        this.setState({config: newConfig})
      }
    }
  }

  handleAddCardToDashboard(e, dashboardId) {
    e.preventDefault()
    this.props.addCardToCards({state: this.state, title: this.state.config.title, sliceId: this.state.config.sliceId, config: this.state.config, rawCode: this.state.userCode, chartGenerator: IIFChartGenerator(this.state.userCode)})
    setTimeout(() => {
      const newCard = this.props.cards[this.props.cards.length - 1]
      this.props.addCardToDashboard(+dashboardId, newCard)
    }, 20)
  }

  handleLoadState(card) {
    this.setState(card.state)
  }
  setChartType(e) {
    let newX, newY, newZ
    switch (e.target.value) {
    case 'Bar':
      newX = 'Bar Name'
      newY = 'Bar Height'
      break

    case 'Pie':
      newX = 'Slice Size'
      newY = 'Slice Label'
      break

    case 'Bubble':
      newX = 'Size'
      newY = 'Label'
      newZ = 'Color Group'
      break

    case 'Area':
      newX = 'X Axis'
      newY = 'Y Axis'
      break

    case 'Line':
      newX = 'X Axis'
      newY = 'Y Axis'
      break

    default:
      newX = 'X Axis'
      newY = 'Y Axis'
    }
    this.setState({x_label: newX, y_label: newY, z_label: newZ || '', showZ: !!newZ, chartType: e.target.value, userCode: CHART_TEMPLATES[e.target.value]})
  }
  render() {
    return (
  <div className='container-fluid'>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
        <SliceSelector
          changeSlice={this.handleChangeSlice}
          currentSlice={this.state.config.data}
        />
        <ChartTypeSelector
          options={CHART_TEMPLATES}
          setChartType={this.setChartType}
          currentType={this.state.chartType}
        />
        <AxisSelector
          label={this.state.x_label}
          attribute='x'
          currentSettings = {this.state.config.x || {}}
          currentSlice={this.state.config.data}
          changeConfig={this.changeConfig}
        />
        <AxisSelector
          label={this.state.y_label}
          attribute='y'
          currentSettings = {this.state.config.y || {}}
          currentSlice={this.state.config.data}
          changeConfig={this.changeConfig}
        />
        {!this.state.showZ || <AxisSelector
          label={this.state.z_label}
          attribute='z'
          currentSettings = {this.state.config.z || {}}
          currentSlice={this.state.config.data}
          changeConfig={this.changeConfig}
        />}
        <ColorSelector
          label={'Color Scheme'}
          currentScheme = {this.state.config.colorScheme || {}}
          setScheme={this.changeConfig('colorScheme')}
        />
        <ChartSizer
          currentWidth={this.state.config.dimensions.fullWidth}
          currentHeight={this.state.config.dimensions.fullHeight}
          changeDimension={this.changeConfig('dimensions')}
        />
        <AddCardToDashForm handleSubmit={this.handleAddCardToDashboard} />
        <Button onClick={this.toggleShowTextEditor}>{this.state.showTextEditor ? 'Hide the Editor' : 'Edit the Code'}</Button>
        </div>
        <div className="col-sm-9">
        <ExplorerChart
          cardTitle={this.state.config.title}
          updateCardTitle={this.changeConfig('title')}
          config={this.state.config}
          userCode={this.state.userCode}
        />
        </div>
      </div>
    </div>
    {!this.state.showTextEditor || <D3TextEditor handleCode={this.handleCodeFromTextEditor} codeForEditor={this.state.userCode || this.state.template} />}
    <div className="container-fluid">
      <div className="row">
          <div className="container" style={{'height': 'auto', 'width': '100%'}}>
              <div className="col-sm-6">
                <ul style={{listStyle: 'none'}}>
                  <h4>Choose Dashboard</h4>
                  { this.props.availableDashboards.map(db => (
                    <li key={db.id} ><a onClick= { () => this.props.setCurrentDashboard(db.id)}>{db.title}</a> </li>
                )) }
                </ul>
              </div>
              <div className="col-sm-6">
                <ul style={{listStyle: 'none'}}>
                  <h4>Load Card from Current Dashboard</h4>
                  { this.props.currentDashboard.cards.map((card, index) => (
                    <li key={index} ><a onClick= {() => this.handleLoadState(card) }>{card.title}</a> </li>
                )) }
                </ul>
              </div>
            </div>
        </div>
    </div>
  </div>
    )
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
    addCardToDashboard: (dashboardId, card) => dispatch(addCardToDashboard(dashboardId, card)),
    setCurrentDashboard: (id) => dispatch(setCurrentDashboard(id))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerView)
