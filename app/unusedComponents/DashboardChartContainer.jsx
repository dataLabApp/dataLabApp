import React, { Component } from 'react'
import { DragDropContext, DropTarget } from 'react-dnd'
import {Link} from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend'
import DraggableContainer from './DraggableContainer'
import Chart from './Chart'
import {ItemTypes} from '../constants'
import update from 'react/lib/update';
import { snapSensitivity } from '../constants'
import PageHeader from './PageHeader'

const containerTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round((item.left + delta.x)/snapSensitivity)*snapSensitivity;
    const top = Math.round((item.top + delta.y)/snapSensitivity)*snapSensitivity;

    component.moveCard(item.id, left, top);
  },
};

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      cards: {a: {top: 350, left: 50}, b: {top: 650, left: 50}}
    }
  }

  moveCard(id, left, top){
    this.setState(
      update(
        this.state,
        { cards: {
            [id]: {
                 $merge: { left, top },
            }
          }
        })
      )
  }

  render (){
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={{height:window.innerHeight, width:window.innerWidth}}>
        {Object.keys(this.state.cards).map((cardID,index)=>
          <DraggableContainer key={index} id={cardID} {...this.state.cards[cardID]}>
            <Chart />
          </DraggableContainer>)}
      </div>)
  }
}

export default DragDropContext(HTML5Backend)(DropTarget(ItemTypes.CARD, containerTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Dashboard));
