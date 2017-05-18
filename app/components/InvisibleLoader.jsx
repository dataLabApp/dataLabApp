import storage from 'electron-json-storage'
import {loadData} from '../reducers/dataReducer'
import {loadDashboards} from '../reducers/dashboardReducer'
import {loadCards} from '../reducers/cardReducer'
import store from '../store'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {storeChartGenerator, IIFChartGenerator} from '../utils/chartGenerators'

class Loader extends Component {


  componentWillMount() {
    storage.getAll((err, data) => {
      if (err) throw err
      // console.log('data in loader is',data)
      if (data.cards) {
        data.cards.forEach(card => {
          if (!card.config)card.chart = storeChartGenerator(card.rawCode)
          else card.chartGenerator = IIFChartGenerator(card.rawCode)
        })
        const highestId = data.cards.reduce((accum, card) => (card.id>accum ? card.id : accum), 0)
        data.cards.count = highestId
        this.props.loadCards(data.cards)
      }
      if (data.data) this.props.loadData(data.data)
      if (data.dashboards) {
        data.dashboards.currentDashboard.cards.forEach(card => {
          if (!card.config)card.chart = storeChartGenerator(card.rawCode)
          else card.chartGenerator = IIFChartGenerator(card.rawCode)
        })
        data.dashboards.dashboards.forEach(dashboard => { dashboard.cards.forEach(card => card.chart=storeChartGenerator(card.rawCode)) })
        this.props.loadDashboards(data.dashboards)
      }
    })
  }

  render() {
    return (<div id='InvisibleLoader'></div>)
  }
}

function mapStateToProps(state) {
  return {
    currentDashboardCards: state.dashboards.currentDashboard.cards
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCards: (cards) => dispatch(loadCards(cards)),
    loadDashboards: (dashboards) => dispatch(loadDashboards(dashboards)),
    loadData: (data) => dispatch(loadData(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Loader)
