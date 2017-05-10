import React, {Component} from 'react'
import PageHeader from './PageHeader'
import DragAndDrop from './DragAndDrop'
import {Panel} from 'react-bootstrap'
var PrintTemplate = require ('react-print');


export default class DashboardView extends Component {

    print(){
        window.print();
    }

    render(){
        return (
            <div className = "container">
                <button onClick={this.print} className="pull-right" id="react-no-print"><span className="glyphicon glyphicon-download"></span></button>

                <PageHeader header="Dashboard"/>
                    <div className="container">
                        <DragAndDrop />
                    </div>
            </div>    
        );
    }
}




