import React from 'react'
import PageHeader from './PageHeader'
import DragAndDrop from './DragAndDrop'
import {Panel} from 'react-bootstrap'

export default (props)=> (
    <div>
        <PageHeader header="Dashboard" />
            <div className="container">
                <DragAndDrop />
            </div>
    </div>    
);




