import React, {Component} from 'react'
import {ItemTypes} from '../constants'
import { DragSource } from 'react-dnd'

const cardSource = {
  beginDrag(props){
    return {
      id: props.id,
      top: props.top,
      left: props.left
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DraggableContainer extends Component{

  render(){
    const {connectDragSource, isDragging} = this.props
    return connectDragSource(
    <div id = {this.props.id} style={{
        opacity: isDragging ? 0.5 : 1,
        position: 'absolute',
        left: this.props.left,
        top: this.props.top,
        border: '3px solid #8AC007',
        cursor: 'move'
      }}>
      {this.props.children}
    </div>)
  }
}


export default DragSource(ItemTypes.CARD, cardSource, collect)(DraggableContainer)
