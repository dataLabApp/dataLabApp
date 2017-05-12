import storage from 'electron-json-storage'
import {loadData} from '../reducers/dataReducer'
import {loadDashboards} from '../reducers/dashboardReducer'
import {loadCards} from '../reducers/cardReducer'
import store from '../store'
import {connect} from 'react-redux'
import React, {Component} from 'react'

class Loader extends Component{
  constructor(props){
    super(props)
  }

  // componentWillMount(){
  //   storage.getAll((err,data)=>{
  //     if(err)throw err
  //     console.log('data in loader is',data)
  //     if(data.cards)this.props.loadCards(data.cards)
  //     if(data.data)this.props.loadData(data.data)
  //     if(data.dashboards)this.props.loadDashboards(data.dashboards)
  //   })
  // }

  render(){
    return(<div id='InvisibleLoader'></div>)
  }
}

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {
    loadCards: (cards)=>dispatch(loadCards(cards)),
    loadDashboards: (dashboards)=>dispatch(loadDashboards(dashboards)),
    loadData: (data)=>dispatch(loadData(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Loader)
