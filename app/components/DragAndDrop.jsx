const ReactGridLayout = require('react-grid-layout');
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Chart from './Chart'
import DashboardCard from './DashboardCard'
import styles from  '../../node_modules/react-grid-layout/css/styles.css'
import styles2 from '../../node_modules/react-resizable/css/styles.css'
import {updateDashboardLayout} from '../reducers/dashboardReducer'


class DragAndDrop extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.dashboards.currentDashboard.title,
            cards: props.dashboards.currentDashboard.cards
        }
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.updateDashboardLayout = this.props.updateDashboardLayout.bind(this); 
    }
    print(){
        window.print();
    }
    onLayoutChange(layout) {
        let newLayout = this.props.dashboards.currentDashboard.cards.map((card,i)=> Object.assign(card, layout[i]));
        this.setState({
            cards: newLayout
        })
    }

    componentWillUnmount(){
        this.updateDashboardLayout(this.state.title, this.state.cards);
    }

    render(){

        //  var layout = [
        //     {i: 'a', x: 0, y: 0, w: 2, h: 2},
        //     {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2},
        //     {i: 'c', x: 4, y: 0, w: 1, h: 2},
        //     {i: "hi", x: 0, y: Infinity, w: 2, h:2}
        //     ];
            var divStyle = { 
                borderStyle: 'solid',
                borderWidth: '0.5px'
            }

        return(<div>
            <ReactGridLayout className="layout" layout={this.state.cards} cols={12} rowHeight={30} width={1200} ref="rgl"  onLayoutChange={this.onLayoutChange}>

                {
                    this.state.cards.map((card)=>(<div key={card.i} style={divStyle}><DashboardCard card ={card} /></div>))
                }
            </ReactGridLayout>
            </div>
        );
    }
}
                // <div key={'b'} style = {divStyle}>b</div>
                // <div key = {'c'} style = {divStyle}><DashboardCard /></div>
                // <div key = {"hi"} style = {divStyle}>4 </div>


// ----------------------- Container -----------------------

const mapStateToProps = (state, ownProps) => {
  return {
      dashboards: state.dashboards,
      currentDashboard: state.currentDashboard
  }
}

const mapDispatchToProps = (dispatch) =>({
    updateDashboardLayout: (dashboardTitle, layout) => {
        dispatch(updateDashboardLayout(dashboardTitle, layout));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);
