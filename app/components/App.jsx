import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NavTop from './Navbar'
import storage from 'electron-json-storage'
import {loadData} from '../reducers/dataReducer'
import {loadDashboards} from '../reducers/dashboardReducer'
import {loadCards} from '../reducers/cardReducer'
import {connect} from 'react-redux'


class App extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    storage.getAll((err,data)=>{
      if(err)throw err
      if(data.cards)this.props.loadCards(data.cards)
      if(data.data)this.props.loadData(data.data)
      if(data.dashboards)this.props.loadDashboards(data.dashboards)
    })
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <NavTop />
        <Link to='/dashboard'>CLICKHERE</Link>
        <p>Here we are</p>
        {this.props.children}
      </div>)
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
export default connect(mapStateToProps,mapDispatchToProps)(App)
