import React from 'react'
import PageHeader from './PageHeader'
import DraggableContainer from './DashboardChartContainer'
import {Panel} from 'react-bootstrap'

export default (props)=> (
    <div>
        <PageHeader header="Dashboard" />
            <div className="container">
                <Panel header="Dashboard Name">
                    <DraggableContainer/>
                </Panel>
            </div>
    </div>    
);




