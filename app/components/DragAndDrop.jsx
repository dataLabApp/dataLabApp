const ReactGridLayout = require('react-grid-layout');
import React, { Component } from 'react';
import { connect } from 'react-redux'
import styles from  '../../node_modules/react-grid-layout/css/styles.css'
import styles2 from '../../node_modules/react-resizable/css/styles.css'


class DragAndDrop extends Component {
    constructor(props){
        super(props);
    }
    render(){
         var layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
            ];
            var divStyle = { 
                'border-style': 'solid',
                'border-width': '5px'
            }
        return(
            <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div key={'a'} style = {divStyle}>a</div>
                <div key={'b'} style = {divStyle}>b</div>
                <div key={'c'} style = {divStyle}>c</div>
            </ReactGridLayout>
        );
    }
}

export default DragAndDrop;

