// Required libraries
import React from 'react'
import { connect } from 'react-redux'
import BarChart from './BarChart'

// ------------- Component
const HomeView = (props) => {

    return (
        <div id="holder">
            <BarChart />
        </div>
    );
};

// ------------- Container
const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
